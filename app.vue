<script setup lang="ts">
const config = useRuntimeConfig()
const siteTitle = config.public.siteTitle

useHead({
  titleTemplate: titleChunk =>
    titleChunk ? `${titleChunk} - ${siteTitle}` : siteTitle,
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>
