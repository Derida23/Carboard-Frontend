<script setup lang="ts">
</script>

<template>
  <div class="relative">
    <LayoutLandingNavbar />
    <div class="landing h-[97vh]">
      <slot />
    </div>
    <LayoutLandingFooter />
  </div>
</template>

<style scoped lang="postcss">
.landing {
  @apply max-w-7xl mx-auto px-6 mt-10;
}
</style>
