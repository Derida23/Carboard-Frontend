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

const background = computed(() => {
  if (props.status === 'success') {
    return 'bg-blue-50 dark:bg-blue-950'
  }

  if (props.status === 'error') {
    return 'bg-red-50 dark:bg-red-950'
  }

  return `bg-orange-50 dark:bg-orange-500`
})
</script>

<template>
  <UModal v-model="isOpen">
    <div class="p-5 text-center">
      <div class="flex-center">
        <img :src="imgUrl" alt="logo" class="w-28">
      </div>
      <div class=" p-5 rounded-xl" :class="[background]">
        <h3>{{ title }}</h3>
        <p class="mt-3">
          <slot />
        </p>
      </div>
    </div>
  </UModal>
</template>

<style scoped lang="postcss"></style>
