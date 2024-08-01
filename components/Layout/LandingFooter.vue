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
  <footer class="w-full">
    <section class="max-w-7xl py-5 mx-auto ">
      <div class="flex items-center justify-between">
        <img src="~/assets/images/logo.png" alt="logo" class="w-10 h-10">
        <section class="flex items-center gap-x-5">
          <NuxtLink
            v-for="(link, index) in navLinks"
            :key="index"
            :to="link.to"
            class="text-slate-900 px-2 py-2 text-base hover:text-orange-500 "
            active-class="text-orange-400"
          >
            {{ link.label }}
          </NuxtLink>
        </section>
        <section class="flex items-center gap-x-4">
          <IconCSS name="i-mdi-youtube-tv" class="!h-6 !w-6 text-black/50 hover:text-orange-400 cursor-pointer" />
          <IconCSS name="i-mdi-facebook" class="!h-6 !w-6 text-black/50 hover:text-orange-400 cursor-pointer" />
          <IconCSS name="i-mdi-twitter" class="!h-6 !w-6 text-black/50 hover:text-orange-400 cursor-pointer" />
          <IconCSS name="i-mdi-instagram" class="!h-6 !w-6 text-black/50 hover:text-orange-400 cursor-pointer" />
        </section>
      </div>
      <section class="mt-10">
        <h3>
          Carboard
        </h3>
        <div class="grid grid-cols-10">
          <p class="col-span-8">
            Explore our diverse fleet of vehicles available for rent, whether you're seeking the convenience of a compact car for city travels, the freedom of a motorcycle for adventurous rides, or the spacious comfort of a minibus for group excursions.
          </p>
          <p class="col-span-2 text-end">
            © 2024 Carboard
          </p>
        </div>
      </section>
    </section>
  </footer>
</template>
