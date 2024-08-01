<script setup lang="ts">
definePageMeta({
  layout: 'landing',
  title: 'Landing',
})

useHead({
  title: 'Rent a car, motorcycle, or minibus in town',
})

const mark = reactive([
  { name: 'Audi', icon: 'audi' },
  { name: 'Mazda', icon: 'mazda' },
  { name: 'Volkswagon', icon: 'vw' },
  { name: 'BMW', icon: 'bmw' },
  { name: 'Mercedez', icon: 'mercedez' },
  { name: 'Ford', icon: 'ford' },
  { name: 'Nissan', icon: 'nissan' },
])
</script>

<template>
  <section class="flex items-center justify-between">
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
  </section>

  <section>
    <div class="flex items-center justify-between px-20">
      <div v-for="item, index in mark" :key="index">
        <NuxtImg
          :src="`/mark/${item.icon}.png`" :alt="item.icon"
        />
      </div>
    </div>
  </section>

  <section class="mt-20 relative">
    <div class="w-full h-full bg-[url('~/assets/images/landing/line.png')] absolute top-0" />
    <h5 class="text-center text-gray-400 mb-2">
      HOW IT WORK
    </h5>
    <h2 class="text-center mb-10">
      Rent with following 3 working steps
    </h2>

    <div class="flex items-baseline justify-center mt-10 ">
      <div class="text-center">
        <div class="flex-center">
          <div class="w-32 h-32 flex items-center justify-center rounded-3xl shadow-[0px_12px_32px_0px_rgba(169,169,173,0.16)]">
            <img src="~/assets/images/landing/location.svg" alt="location">
          </div>
        </div>
        <h4 class="mt-4">
          Choose location
        </h4>
        <p class="text-gray-300 mt-2">
          Choose your location and find <br> your best car.
        </p>
      </div>

      <img
        src="~/assets/images/landing/dashed.svg"
        alt="dashed"
        class="pb-5"
      >

      <div class="text-center">
        <div class="flex-center">
          <div class="blue-gradient w-32 h-32 flex items-center justify-center rounded-3xl shadow-[0px_12px_32px_0px_rgba(169,169,173,0.16)]">
            <img src="~/assets/images/landing/calendar.svg" alt="calendar">
          </div>
        </div>
        <h4 class="mt-4">
          Pick-up date
        </h4>
        <p class="text-gray-300 mt-2">
          Select your pick up date and <br> time to book your car.
        </p>
      </div>

      <img
        src="~/assets/images/landing/dashed.svg"
        alt="dashed"
        class="pb-5"
      >

      <div class="text-center">
        <div class="flex-center">
          <div class="w-32 h-32 flex items-center justify-center rounded-3xl shadow-[0px_12px_32px_0px_rgba(169,169,173,0.16)]">
            <img src="~/assets/images/landing/car.svg" alt="car">
          </div>
        </div>
        <h4 class="mt-4">
          Book your car
        </h4>
        <p class="text-gray-300 mt-2">
          Book your car and we will deliver <br> it directly to you.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">
.blue-gradient {
  background: radial-gradient(115.89% 115.89% at 49.61% 115.89%, rgb(255, 131, 48) 0%, rgb(251, 187, 135) 100%)
}
</style>
