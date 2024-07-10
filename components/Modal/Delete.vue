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
const isOpen = defineModel('isOpen')

const imgUrl = computed<string>(() => {
  return new URL(`/assets/images/notification/trash.png`, import.meta.url).href
})
</script>

<template>
  <UModal v-model="isOpen">
    <div class="p-5 text-center">
      <div class="flex-center">
        <img :src="imgUrl" alt="logo" class="w-36">
      </div>
      <div class="bg-red-50 p-5 rounded-xl">
        <h3>Confirm Delete</h3>
        <p class="mt-3">
          <slot />
        </p>
        <div class="grid grid-cols-2 gap-3 px-5 pt-5 pb-3">
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

<style scoped lang="postcss"></style>
