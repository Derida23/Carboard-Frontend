<script setup lang="ts">
const { overlay } = storeToRefs(useOverlay())
</script>

<template>
  <div class="layout-container relative">
    <div v-if="overlay" class="absolute z-[999] w-screen h-[98%] overlay flex items-center justify-center">
      <Overlay />
    </div>
    <LayoutSidebar />
    <LayoutNavbar>
      <slot />
    </LayoutNavbar>
  </div>
</template>

<style scoped lang="postcss">
.layout-container {
  @apply bg-slate-50;
  @apply dark:bg-slate-800;
  @apply text-slate-900;
  @apply dark:text-white;
  @apply w-screen;
  @apply h-screen;
  @apply flex;
  @apply py-4;
  @apply px-2;
  @apply overflow-x-hidden;
}
.overlay {
  backdrop-filter: blur(2px);
}
</style>
