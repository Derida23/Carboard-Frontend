<script setup lang="ts">
const props = defineProps({
  status: {
    type: String as PropType<'warning' | 'error' | 'success'>,
    default: 'warning',
  },
  title: {
    type: String,
    required: true,
  },
})
const isOpen = defineModel('isOpen')

const imgUrl = computed<string>(() => {
  return new URL(`/assets/images/notification/${props.status}.png`, import.meta.url).href
})
</script>

<template>
  <UModal v-model="isOpen">
    <div class="p-5 text-center">
      <div class="flex-center">
        <img :src="imgUrl" alt="logo" class="w-28">
      </div>
      <div class="bg-orange-50 p-5 rounded-xl">
        <h3>{{ title }}</h3>
        <p class="mt-3">
          <slot />
        </p>
      </div>
    </div>
  </UModal>
</template>

<style scoped lang="postcss"></style>
