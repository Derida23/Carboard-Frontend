<script setup lang="ts">
definePageMeta({
  layout: 'landing',
  title: 'Landing',
})

useHead({
  title: 'Rent a car, motorcycle, or minibus in town',
})
</script>

<template>
  <div class="flex items-center justify-between h-1/2 pt-20">
    <div class="flex flex-col gap-y-2 ">
      <h4 class="font-bold">
        Plan your trip now
      </h4>
      <h1 class="font-bold text-6xl">
        Save <span class="text-orange-500">big</span> with our <br>car rental
      </h1>
      <p class="mt-4 text-gray-500">
        Rent the car of your dreams. Unbeatable prices, unlimited miles,<br> flexible pick-up options and much more.
      </p>
      <div class="flex items-center gap-x-4 mt-10">
        <UButton size="xl" :ui="{ rounded: 'rounded-none' }">
          Book Ride <UIcon name="i-heroicons-check-badge" />
        </UButton>
        <UButton color="black" size="xl" :ui="{ rounded: 'rounded-none', size: '100px' }">
          Our Car <UIcon name="i-heroicons-arrow-right" />
        </UButton>
      </div>
    </div>
    <div class="bg-[url('~/assets/images/landing/hero-bg.png')] absolute top-0 right-0 w-1/2 h-full bg-no-repeat" />
    <img src="~/assets/images/landing/hero.png" alt="hero" class="w-[700px] pt-5 z-0">
  </div>
</template>

<style scoped lang="postcss"></style>
