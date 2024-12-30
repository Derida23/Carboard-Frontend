<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { UserSchema } from '~/schemas/user-schema'

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'submit', form: FormSubmitEvent<Schema>): void
}>()

const isOpen = defineModel('isOpen', { default: false })
const payload = defineModel('payload', { default: { id: 0, name: undefined, email: undefined, role: undefined } })

function close() {
  emits('close')
}

function onSubmit(event: FormSubmitEvent<Schema>) {
  emits('submit', event)
  close()
}
</script>

<template>
  <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-3xl' }">
    <div class="modal-form">
      <div class="modal-form-title">
        <div class="modal-form-title-icon">
          <img src="~/assets/images/update.png" alt="logo" class="w-10">
          <h4>Update User</h4>
        </div>
        <UButton icon="i-heroicons-x-mark-20-solid" color="gray" variant="link" @click="close()" />
      </div>
      <section>
        <UForm :schema="UserSchema" :state="payload" class="space-y-4 mt-5" @submit="onSubmit">
          <div class="grid grid-cols-2 gap-x-7 ">
            <div class="space-y-4">
              <UFormGroup label="Name" name="name">
                <UInput v-model="payload.name" size="lg" placeholder="Please input name..." />
              </UFormGroup>
              <UFormGroup label="Email" name="email">
                <UInput v-model="payload.email" disabled size="lg" placeholder="Please input email..." />
              </UFormGroup>
              <UFormGroup label="Role" name="role">
                <USelectMenu v-model="payload.role" :options="['user', 'admin']" size="lg" placeholder="Please input role..." />
              </UFormGroup>
            </div>
            <div class="space-y-4">
              <UFormGroup label="Phone number" name="phone_number">
                <UInput v-model="payload.phone_number" type="number" size="lg" placeholder="Please input phone number..." />
              </UFormGroup>
              <UFormGroup label="Address" name="address">
                <UTextarea v-model="payload.address" size="lg" placeholder="Please input address..." :rows="5" />
              </UFormGroup>

              <div class="modal-form-action">
                <UButton size="lg" variant="outline" block @click="close()">
                  Cancel
                </UButton>
                <UButton size="lg" type="submit" block :loading="loading">
                  Update
                </UButton>
              </div>
            </div>
          </div>
        </UForm>
      </section>
    </div>
  </UModal>
</template>

<style scoped lang="postcss">
.modal-form {
  @apply p-5;

  &-title {
    @apply flex;
    @apply justify-between;
    @apply items-center;

    &-icon {
      @apply flex;
      @apply flex-row;
      @apply gap-x-2;
      @apply items-center;
    }
  }

  &-action {
    @apply grid;
    @apply grid-cols-2;
    @apply gap-x-3;
    @apply !mt-5;
  }
}
</style>
