<template>
  <div class="layout-container">
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
</style>
