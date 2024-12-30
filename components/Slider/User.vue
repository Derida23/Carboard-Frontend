<script setup lang="ts">
import type { UserPayload } from '~/types/payloads/user-payload'

const props = defineProps({
  payload: {
    type: Object as PropType<UserPayload>,
    required: true,
  },
})

const emits = defineEmits<{
  (e: 'action', type: string): void
}>()
const isOpen = defineModel('isOpen', { default: false })
</script>

<template>
  <USlideover v-model="isOpen">
    <div class="slideuser">
      <div class="slideuser-header">
        <b>User Detail</b>
        <UButton icon="i-heroicons-x-mark-16-solid" variant="ghost" square @click="isOpen = false" />
      </div>
      <hr>
      <div class="slideuser-avatar flex-center">
        <UAvatar :alt="props.payload.name" size="3xl" />
      </div>
      <div class="text-center">
        <h3>{{ props.payload.name }}</h3>
        <p class="text-primary">
          {{ props.payload.email }}
        </p>
      </div>
      <UCard class="!mt-5">
        <div class="slideuser-content">
          <div class="space-y-2">
            <p>Role</p>
            <p>Phone Number</p>
            <p>Address</p>
          </div>
          <div class="space-y-2">
            <p>{{ props.payload.role }}</p>
            <p>{{ props.payload?.phone_number ?? "-" }}</p>
            <p>{{ props.payload?.address ?? "-" }}</p>
          </div>
        </div>
      </UCard>

      <div class="slideuser-action">
        <UButton block color="red" variant="outline" icon="i-heroicons-trash" size="lg" @click="emits('action', 'delete')">
          Delete
        </UButton>
        <UButton block icon="i-heroicons-pencil-square" size="lg" @click="emits('action', 'edit')">
          Edit
        </UButton>
      </div>
    </div>
  </USlideover>
</template>

<style scoped lang="postcss">
.slideuser {
 @apply p-4;
 @apply flex-col;
 @apply space-y-2;

 &-header {
  @apply flex;
  @apply items-center;
  @apply justify-between;
 }

 &-avatar {
  @apply !mt-10;
 }

 &-content {
  @apply grid;
  @apply grid-cols-2;
  @apply gap-x-3;
 }

 &-action {
  @apply flex;
  @apply items-center;
  @apply justify-between;
  @apply space-x-2;
  @apply grid;
  @apply grid-cols-2;
  @apply !mt-6;
 }
}
</style>
