<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
}>()
const isOpen = defineModel('isOpen', { default: false })

const imgUrl = computed<string>(() => {
  return new URL(`/assets/images/notification/trash.png`, import.meta.url).href
})
</script>

<template>
  <UModal v-model="isOpen">
    <div class="modal-delete">
      <div class="flex-center">
        <img :src="imgUrl" alt="logo" class="w-36">
      </div>
      <div class="modal-delete-body">
        <h3>Confirm Delete</h3>
        <p class="mt-3">
          <slot />
        </p>
        <div class="modal-delete-action">
          <UButton
            color="red"
            variant="outline"
            size="lg"
            block
            @click="emits('close')"
          >
            Cancel
          </UButton>
          <UButton
            color="red"
            size="lg"
            block
            :loading="props.loading"
            @click="emits('submit')"
          >
            Delete
          </UButton>
        </div>
      </div>
    </div>
  </UModal>
</template>

<style scoped lang="postcss">
  .modal-delete {
    @apply p-5;
    @apply text-center;

    &-body {
      @apply bg-red-50;
      @apply dark:bg-red-950;
      @apply p-5;
      @apply rounded-xl;
    }

    &-action {
      @apply grid;
      @apply grid-cols-2;
      @apply gap-3;
      @apply px-5;
      @apply pt-5;
      @apply pb-3;
    }
  }
</style>
