<script setup lang="ts">
import type { z } from 'zod'
import { UomColumns } from '~/constants/table'
import { TransmissionLinks } from '~/constants/breadcrumb'
import { UomSchema } from '~/schemas/uom-schema'
import type { FormSubmitEvent } from '#ui/types'
import type { Notification } from '~/types'

type Schema = z.output<typeof UomSchema>

definePageMeta({
  layout: 'dashboard',
  title: 'Transmissions',
})

useHead({
  title: 'Transmissions',
})

// Filter Table
const search = ref('')
const params = ref({
  name: '',
  start_date: undefined,
  end_date: undefined,
  page: 1,
})

const debounceSearch = useDebounce(search, 500)
watch(debounceSearch, (value) => {
  params.value.name = value
})

// Get Data
const { findAll, create, update, remove } = useApiTransmission()
const { data: transmissions, status, refresh } = await findAll(params.value)

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
const transmissionId = ref<number | undefined>(undefined)
const loading = ref(false)
function onOpenModal(
  mode: string,
  row: { id?: number, name?: string, description?: string } = { id: undefined, name: undefined, description: undefined },
) {
  transmissionId.value = row.id

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

  if (transmissionId.value) {
    await update(transmissionId.value, event.data, {
      onSuccess: () => {
        loading.value = false
        onNotification('success', 'Great!', 'Your data has been successfully update.')
        refresh()
      },
      onError: (error: { body: { message: string } }) => {
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
      onError: (error: { body: { message: string } }) => {
        loading.value = false
        onNotification('error', 'Error', error.body.message)
      },
    })
  }
}

async function onRemove() {
  modal.delete = false
  loading.value = true

  if (transmissionId.value) {
    await remove(transmissionId.value, {
      onSuccess: () => {
        loading.value = false
        onNotification('success', 'Great!', 'Your data has been successfully deleted.')
        refresh()
      },
      onError: (error: { body: { message: string } }) => {
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
  <div class="transmissions">
    <UBreadcrumb :links="TransmissionLinks" />
    <UCard>
      <div class="transmissions-filter ">
        <UInput
          v-model="search" class="col-span-3" icon="i-heroicons-magnifying-glass" placeholder="Search..."
          size="lg"
        />
        <div class="transmissions-filter-date">
          <div class="col-span-4">
            <FormDatePicker v-model:start="params.start_date" v-model:end="params.end_date" />
          </div>
        </div>
        <UButton icon="i-heroicons-plus" block size="lg" @click="onOpenModal('Create')">
          Add Data
        </UButton>
      </div>
    </UCard>
    <UCard>
      <FormTable
        v-model:page="params.page" :columns="UomColumns" :rows="transmissions?.data" :loading="status === 'pending'"
        :total="transmissions?.meta.total" @delete="onOpenModal('Delete', $event)" @edit="onOpenModal('Update', $event)"
      />
    </UCard>

    <ModalDelete v-model="modal.delete" :loading @submit="onRemove" @close="modal.delete = false">
      Are you sure? you would like to delete this transmission from the database? this action can't be undone
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
.transmissions {
  @apply flex;
  @apply flex-col;
  @apply gap-y-5;

  &-filter {
    @apply grid;
    @apply grid-cols-7;
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
