<script setup lang="ts">
import type { z } from 'zod'
import { UomColumns } from '~/constants/table'
import { FuelLinks } from '~/constants/breadcrumb'
import { UomSchema } from '~/schemas/uom-schema'
import type { FormSubmitEvent } from '#ui/types'
import type { Notification } from '~/types'

type Schema = z.output<typeof UomSchema>

definePageMeta({
  layout: 'dashboard',
  title: 'Fuels',
})

useHead({
  title: 'Fuels',
})

// Get Data
const { findAll, create, update, remove } = useApiFuel()
const { data: fuels, status, refresh } = await findAll({})

// Filter Table
const search = ref(undefined)
const range = ref({
  start: new Date(),
  end: new Date(),
})

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
const fuelId = ref<number | undefined>(undefined)
const loading = ref(false)
function onOpenModal(
  mode: string,
  row: { id?: number, name?: string, description?: string } = { id: undefined, name: undefined, description: undefined },
) {
  fuelId.value = row.id

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

  if (fuelId.value) {
    await update(fuelId.value, event.data, {
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

  if (fuelId.value) {
    await remove(fuelId.value, {
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
  status: 'success',
  title: 'Forgot Password?',
  description: 'Lorem ipsum',
})

function onNotification(type: 'warning' | 'error' | 'success', title: string, description: string) {
  modal.notification = true

  notification.status = type
  notification.title = title
  notification.description = description
}
</script>

<template>
  <div class="fuels">
    <UBreadcrumb :links="FuelLinks" />
    <UCard>
      <div class="fuels-filter ">
        <UInput
          v-model="search"
          class="col-span-3"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search..."
          size="lg"
        />
        <div class="fuels-filter-date">
          <div class="col-span-3">
            <FormDatePicker v-model="range" />
          </div>
          <UButton
            icon="i-heroicons-adjustments-horizontal"
            variant="outline"
            block
          >
            Filter
          </UButton>
        </div>
        <UButton
          icon="i-heroicons-plus"
          block
          size="lg"
          @click="onOpenModal('Create')"
        >
          Add Fuels
        </UButton>
      </div>
    </UCard>
    <UCard>
      <FormTable
        :columns="UomColumns"
        :rows="fuels?.data"
        :loading="status === 'pending'"
        @delete="onOpenModal('Delete', $event)"
        @edit="onOpenModal('Update', $event)"
      />
    </UCard>

    <ModalDelete
      v-model="modal.delete"
      :loading
      @submit="onRemove"
      @close="modal.delete = false"
    >
      Are you sure? you would like to delete this fuel from the database? this action can't be undone
    </ModalDelete>

    <ModalUom
      v-model="modal.form"
      v-model:payload="payload"
      :title
      :validation-schema="UomSchema"
      :loading
      @submit="onSubmit"
      @close="modal.form = false"
    />

    <ModalNotification v-model="modal.notification" :status="notification.status" :title="notification.title">
      <div v-html="notification.description" />
    </ModalNotification>
  </div>
</template>

<style scoped lang="postcss">
.fuels {
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
