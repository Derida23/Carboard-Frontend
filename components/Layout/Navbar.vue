<script setup lang="ts">
const { toggleSideNav } = useLayoutStore()
const search = ref(null)

const breakpoint = useBreakpoint()

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

const profileItems = [
  [{
    label: 'Elysia',
    sublabel: '2nd Flame Chaser',
    avatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
    slot: 'account',
    disabled: true,
  }],
  [
    { label: 'Your Profile', icon: 'i-heroicons-user-circle', to: '' },
    { label: 'Add Account', icon: 'i-heroicons-user-plus', to: '' },
  ],
  [{ label: 'Try Enterprise', icon: 'i-heroicons-globe-alt', to: '', slot: 'special' }],
  [{ label: 'Logout', to: '/auth/login' }],
]

const router = useRouter()
watch(router.currentRoute, () => {
  if (breakpoint.lt('md'))
    toggleSideNav()
}, { immediate: true, deep: true })
</script>

<template>
  <div class="navbar-container">
    <div class="navbar-wrapper">
      <div class="navbar-content">
        <UButton
          icon="i-heroicons-bars-3" color="gray" padded variant="link"
          @click="toggleSideNav"
        />
      </div>
      <div class="navbar-content">
        <UInput v-model="search" icon="i-heroicons-magnifying-glass" placeholder="Search..." />
        <UButton icon="i-heroicons-bell" color="gray" variant="link" :ui="{ rounded: 'rounded-full' }" />
        <UTooltip :text="`Switch to ${isDark ? 'Light' : 'Dark'} Mode`" class="text-md">
          <UButton
            :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'" color="gray" variant="link"
            :ui="{ rounded: 'rounded-full' }" @click="isDark = !isDark"
          />
        </UTooltip>
        <UButton icon="i-heroicons-language" color="gray" variant="link" :ui="{ rounded: 'rounded-full' }" />
        <UDropdown
          class="navbar-menu"
          :items="profileItems"
          :ui="{ container: 'z-30 group', item: { disabled: 'cursor-text select-text opacity-1' } }"
          :popper="{ placement: 'bottom-start' }"
        >
          <UButton color="gray" trailing-icon="i-heroicons-chevron-down" variant="ghost">
            <template #leading>
              <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" size="sm" />
            </template>
          </UButton>
          <template #account="{ item }">
            <div class="navbar-menu-avatar">
              <UAvatar :src="item.avatar" class="mr-2" />
              <div class="flex flex-col">
                <p class="navbar-menu-avatar-label">
                  {{ item.label }}
                </p>
                <span class="navbar-menu-avatar-sublabel">{{ item.sublabel }}</span>
              </div>
            </div>
          </template>
          <template #special="{ item }">
            <div class="flex justify-between items-center w-full">
              <div class="navbar-content">
                <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4" />
                <span class="truncate">{{ item.label }}</span>
              </div>
              <UIcon name="i-heroicons-sparkles-solid" class="h-5 w-5 text-yellow-400 dark:text-yellow-300" />
            </div>
          </template>
        </UDropdown>
      </div>
    </div>

    <div class="relative py-4 pr-3 lg:pr-4 overflow-auto">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.navbar-container {
  @apply flex;
  @apply flex-col;
  @apply w-full;
  @apply h-full;
}

.navbar-wrapper {
  @apply flex;
  @apply items-center;
  @apply justify-between;
  @apply py-2;
  @apply px-4;
  @apply rounded-md;
  @apply bg-white;
  @apply dark:bg-gray-900;
  @apply ring-1;
  @apply ring-gray-200;
  @apply dark:ring-gray-800;
  @apply shadow;
}

.navbar-content {
  @apply flex;
  @apply items-center;
  @apply gap-2;
}

.navbar-menu {
  &-avatar {
    @apply flex;
    @apply justify-between;
    @apply items-center;
    @apply text-sm;
    @apply text-left;
    @apply font-semibold;

    &-label {
      @apply truncate;
      @apply font-medium;
      @apply text-gray-900;
      @apply dark:text-white;
    }

    &-sublabel {
      @apply text-xs;
      @apply font-normal;
      @apply opacity-75;
    }
  }
}
</style>
