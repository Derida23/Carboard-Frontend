<script setup lang="ts">
const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/abouts' },
  { label: 'Vehicles Models', to: '/vehicles' },
  { label: 'Our Team', to: '/teams' },
  { label: 'Contact', to: '/contacts' },
]
</script>

<template>
  <div class="nav">
    <nav class="nav-container">
      <div class=" nav-wrapper">
        <div class="flex items-center">
          <img class="h-12 w-12" src="@/assets/images/logo.png" alt="Logo">
          <div class="ml-2 font-semibold text-base">
            <p class="text-2xl text-orange-400">
              Car
            </p>
            <p class="-mt-1">
              Board
            </p>
          </div>
        </div>

        <div class="flex items-center gap-x-2">
          <NuxtLink
            v-for="(link, index) in navLinks"
            :key="index"
            :to="link.to"
            class="text-slate-900 px-2 py-2 text-base hover:text-orange-500 "
            active-class="text-orange-400"
          >
            {{ link.label }}
          </NuxtLink>
          <div class="flex items-center ml-4">
            <UButton variant="link" size="lg" color="black">
              <span class="text-base">Login</span>
            </UButton>
            <UButton color="orange" variant="outline">
              <div class="flex items-center gap-x-2">
                <p>
                  Register Now
                </p>
                <UIcon name="i-heroicons-arrow-right" />
              </div>
            </UButton>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="postcss">
.nav {
  @apply bg-white;
  @apply sticky;
  @apply top-0;

  &-container {
    @apply max-w-7xl;
    @apply mx-auto;
    @apply flex;
    @apply flex-col;
    @apply justify-center;
  }

  &-wrapper {
    @apply flex;
    @apply items-center;
    @apply justify-between;
    @apply h-fit;
    @apply py-3;
  }
}
</style>
