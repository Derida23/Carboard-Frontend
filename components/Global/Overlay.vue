<script setup lang="ts"></script>

<template>
  <div class="loader" />
</template>

<style scoped lang="postcss">
.loader {
  width: 48px;
  height: 48px;
  @apply bg-orange-400;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg) scale(0.2);
    border-radius: 10%;
  }
  50% {
    transform: rotate(180deg) scale(1.5);
    border-radius: 50%;
  }
  100% {
    transform: rotate(360deg) scale(0.2);
    border-radius: 10%;
  }
}
</style>
