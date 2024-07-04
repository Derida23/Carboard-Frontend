<template>
  <div class="layout-container">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.layout-container {
  @apply bg-slate-50;
  @apply w-screen;
  @apply h-screen;
  @apply text-slate-900;
}
</style>