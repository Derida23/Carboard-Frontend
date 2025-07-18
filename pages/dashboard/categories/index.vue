<script setup lang="ts">
import type { z } from 'zod'
import { UomColumns } from '~/constants/table'
import { CategoryLinks } from '~/constants/breadcrumb'
import { UomSchema } from '~/schemas/uom-schema'
import type { FormSubmitEvent } from '#ui/types'
import type { Notification } from '~/types'

type Schema = z.output<typeof UomSchema>

definePageMeta({
  layout: 'dashboard',
  title: 'Categories',
})

useHead({
  title: 'Categories',
})

// Filter Table
const params = ref({
  name: '',
  start_date: undefined,
  end_date: undefined,
  page: 1,
})

// Get Data
const { findAll, create, update, remove } = useApiCategory()
const { data: categories, status, refresh } = await findAll(params.value)

// Modal Function
const modal = reactive({
  delete: false,
  notification: false,
  form: false,
})

const title = ref('Create')
const payload = reactive<{ name?: string, description?: string }>({
  name: undefined,
  description: undefined,
})

// Update and Create Function
const categoryId = ref<number | undefined>(undefined)
const loading = ref(false)
function onOpenModal(
  mode: string,
  row: { id?: number, name?: string, description?: string } = { id: undefined, name: undefined, description: undefined },
) {
  categoryId.value = row.id

  if (mode !== 'Delete') {
    modal.form = true
    title.value = mode

    payload.name = row.name
    payload.description = row.description
  }
  else {
    modal.delete = true
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  modal.form = false

  if (categoryId.value) {
    await update(categoryId.value, event.data, {
      onSuccess: () => {
        loading.value = false
        onNotification('success', 'Great!', 'Your data has been successfully update.')
        refresh()
      },
      onError: (error) => {
        loading.value = false
        onNotification('error', 'Error', error.body.message)
      },
    })
  }
  else {
    await create(event.data, {
      onSuccess: () => {
        loading.value = false
        onNotification('success', 'Great!', 'Your data has been successfully created.')
        refresh()
      },
      onError: (error) => {
        loading.value = false
        onNotification('error', 'Error', error.body.message)
      },
    })
  }
}

async function onRemove() {
  modal.delete = false
  loading.value = true

  if (categoryId.value) {
    await remove(categoryId.value, {
      onSuccess: () => {
        loading.value = false
        onNotification('success', 'Great!', 'Your data has been successfully deleted.')
        refresh()
      },
      onError: (error) => {
        loading.value = false
        onNotification('error', 'Error', error.body.message)
      },
    })
  }
}

const notification: Notification = reactive({
  status: 'warning',
  title: 'Forgot Password?',
  description: 'Lorem ipsum',
})

function onNotification(type: 'warning' | 'error' | 'success', title: string, description: string) {
  modal.notification = true
  Object.assign(notification, { status: type, title, description })
}
</script>

<template>
  <div class="categories">
    <UBreadcrumb :links="CategoryLinks" />

    <UCard>
      <FormFilter v-model:params="params" @create="onOpenModal('Create')" />
    </UCard>

    <UCard>
      <FormTable
        v-model:page="params.page" :columns="UomColumns" :rows="categories?.data" :loading="status === 'pending'"
        :total="categories?.meta.total" @delete="onOpenModal('Delete', $event)" @edit="onOpenModal('Update', $event)"
      />
    </UCard>

    <ModalDelete v-model="modal.delete" :loading @submit="onRemove" @close="modal.delete = false">
      Are you sure? you would like to delete this category from the database? this action can't be undone
    </ModalDelete>

    <ModalUom
      v-model="modal.form" v-model:payload="payload" :title :validation-schema="UomSchema" :loading
      @submit="onSubmit" @close="modal.form = false"
    />

    <ModalNotification v-model="modal.notification" :status="notification.status" :title="notification.title">
      <div v-html="notification.description" />
    </ModalNotification>
  </div>
</template>

<style scoped lang="postcss">
.categories {
  @apply flex;
  @apply flex-col;
  @apply gap-y-5;

  &-filter {
    @apply grid;
    @apply grid-cols-9;
    @apply gap-5;

    &-date {
      @apply grid;
      @apply grid-cols-4;
      @apply gap-2;
      @apply col-span-3;
    }
  }
}
</style>
