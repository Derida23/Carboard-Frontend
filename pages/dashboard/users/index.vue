<script setup lang="ts">
import type { z } from 'zod'
import { UserLinks } from '~/constants/breadcrumb'
import { UserColumns } from '~/constants/table'
import type { UserSchema } from '~/schemas/user-schema'
import type { Notification } from '~/types'
import type { UserPayload } from '~/types/payloads/user-payload'
import type { FormSubmitEvent } from '#ui/types'

type Schema = z.output<typeof UserSchema>

definePageMeta({
  layout: 'dashboard',
  title: 'Users',
})

useHead({
  title: 'Users',
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
const { findAll, update, remove } = useApiUser()
const { data: users, status, refresh } = await findAll(params.value)

// Modal Function
const modal = reactive({
  delete: false,
  notification: false,
  form: false,
  detail: false,

})

const loading = ref(false)
const title = ref('Create')
const userId = ref(0)

const payload = ref<UserPayload>({
  name: '',
  email: '',
  address: undefined,
  avatar: undefined,
  phone_number: undefined,
  role: 'admin',
})

function onOpenModal(
  mode: string,
  row: UserPayload,
) {
  userId.value = row?.id as number

  payload.value = {
    name: row.name,
    email: row.email,
    address: row?.address,
    avatar: row?.avatar,
    phone_number: row?.phone_number,
    role: row.role,
  }

  if (mode === 'Update') {
    modal.form = true
    title.value = mode
  }
  else if (mode === 'Detail') {
    modal.detail = true
  }
  else {
    modal.delete = true
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  modal.form = false

  if (userId.value) {
    await update(userId.value, event.data, {
      onSuccess: () => {
        loading.value = false
        onNotification('success', 'Great!', 'Your data has been successfully updated.')
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
  loading.value = true
  modal.delete = false

  await remove(userId.value, {
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

function onDetail(type: string) {
  modal.detail = false

  if (type === 'delete') {
    modal.delete = true
  }
  else {
    onOpenModal('Update', payload.value)
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
  <div class="dashboard-content">
    <UBreadcrumb :links="UserLinks" />

    <UCard>
      <FormFilter v-model:params="params" :disable-create="true" title="Users" @create="onOpenModal('Create', payload)" />
    </UCard>

    <UCard>
      <FormTable
        v-model:page="params.page"
        :columns="UserColumns"
        :rows="users?.data"
        :loading="status === 'pending'"
        :total="users?.meta.total"
        @delete="onOpenModal('Delete', $event as UserPayload)"
        @edit="onOpenModal('Update', $event as UserPayload)"
        @detail="onOpenModal('Detail', $event as UserPayload)"
      />
    </UCard>

    <ModalUser v-model="modal.form" v-model:payload="payload" :loading @submit="onSubmit" @close="modal.form = false" />

    <ModalDelete v-model="modal.delete" :loading @submit="onRemove" @close="modal.delete = false">
      Are you sure? you would like to delete this user from the database? this action can't be undone
    </ModalDelete>

    <SliderUser v-model:is-open="modal.detail" :payload @action="onDetail" />

    <ModalNotification v-model="modal.notification" :status="notification.status" :title="notification.title">
      <div v-html="notification.description" />
    </ModalNotification>
  </div>
</template>
