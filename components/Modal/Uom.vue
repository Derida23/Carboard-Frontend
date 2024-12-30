<script setup lang="ts">
import type { z } from 'zod'
import { UomSchema } from '~/schemas/uom-schema'
import type { FormSubmitEvent } from '#ui/types'

type Schema = z.output<typeof UomSchema>

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  payload: {
    type: Object,
    default: () => {},
  },
  validationSchema: {
    type: Object as () => z.ZodObject<{
      name: z.ZodString
      description: z.ZodString
    }>,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'submit', form: FormSubmitEvent<Schema>): void
}>()

const isOpen = defineModel('isOpen', { default: false })
const payload = defineModel('payload', { default: { id: 0, name: undefined, description: undefined } })

function close() {
  emits('close')
}

function onSubmit(event: FormSubmitEvent<Schema>) {
  emits('submit', event)
  close()
}

const route = useRoute()
const feature = computed (() => {
  return route.path.split('/').pop()
})
</script>

<template>
  <UModal v-model="isOpen">
    <pre>{{ payload }}</pre>
    <div class="modal-form">
      <div class="modal-form-title">
        <div class="modal-form-title-icon">
          <img v-if="!payload.id" src="~/assets/images/save.png" alt="logo" class="w-10">
          <img v-else src="~/assets/images/update.png" alt="logo" class="w-10">
          <h4>{{ props.title }} {{ feature }}</h4>
        </div>
        <UButton icon="i-heroicons-x-mark-20-solid" color="gray" variant="link" @click="close" />
      </div>
      <section>
        <UForm :schema="UomSchema" :state="payload" class="space-y-4 mt-5" @submit="onSubmit">
          <UFormGroup label="Name" name="name">
            <UInput v-model="payload.name" size="lg" placeholder="Please input name..." />
          </UFormGroup>

          <UFormGroup label="Description" name="description">
            <UTextarea v-model="payload.description" size="lg" placeholder="Please input description..." :rows="5" />
          </UFormGroup>

          <div class="modal-form-action">
            <UButton size="lg" variant="outline" block @click="close">
              Cancel
            </UButton>
            <UButton size="lg" type="submit" block :loading="loading">
              {{ !payload.id ? 'Save' : 'Update' }}
            </UButton>
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
