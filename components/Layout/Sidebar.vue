<script setup lang="ts">
const { sidenavCollapsed } = storeToRefs(useLayoutStore())
const { toggleSideNav } = useLayoutStore()

const breakpoint = useBreakpoint()
const router = useRouter()
watch(router.currentRoute, () => {
  if (breakpoint.lt('md'))
    toggleSideNav()
}, { immediate: true, deep: true })

const navLinks = reactive([
  [
    { label: 'Dashboard', icon: 'i-heroicons-squares-2x2', to: '/dashboard' },
    { label: 'Statistics', icon: 'i-heroicons-chart-bar', to: '' },
    { label: 'Reports', icon: 'i-heroicons-clipboard-document-list', to: '' },
    { label: 'Maps', icon: 'i-heroicons-map', to: '' },
  ],
  [
    { label: 'Products', icon: 'i-heroicons-cube', to: '/products' },
    { label: 'Transactions', icon: 'i-heroicons-banknotes', to: '' },
    { label: 'Partners', icon: 'i-heroicons-users', to: '' },
  ],
  [
    { label: 'Activity Log', icon: 'i-heroicons-clock', to: '' },
    { label: 'Settings', icon: 'i-heroicons-cog-6-tooth', to: '' },
    { label: 'About', icon: 'i-heroicons-information-circle', to: '' },
  ],
],
)
</script>

<template>
  <div
    class="mr-2 lg:mr-4 z-30" :class="{
      'absolute h-[-moz-available] mb-4': breakpoint.lt('md'),
      'w-[-moz-available]': !sidenavCollapsed && breakpoint.lt('md'),
      'hidden w-0': sidenavCollapsed && breakpoint.lt('md'),
      'min-w-[12vw]': !sidenavCollapsed && breakpoint.gte('lg'),
      'min-w-[72px]': sidenavCollapsed && breakpoint.gte('lg'),
    }"
  >
    <div class="sidenav-container">
      <div class="sidenav-wrapper">
        <div>
          <div class="sidenav-logo">
            <div v-if="(!sidenavCollapsed && breakpoint.gte('lg')) || breakpoint.lt('md')">
              <span class="font-semibold"><span class="text-primary">Carboard</span>App</span>
            </div>
            <div v-else class="max-w-8 max-h-10">
              <img src="~/assets/images/logo.png" alt="logo">
            </div>

            <div v-if="!sidenavCollapsed && breakpoint.gte('lg')">
              <span class="text-xs opacity-75">v1.0.0</span>
            </div>
            <UButton
              v-if="!sidenavCollapsed && breakpoint.lt('md')" color="gray" variant="ghost"
              icon="i-heroicons-x-mark" class="-my-1" @click="sidenavCollapsed = true"
            />
          </div>

          <div v-for="(link, index) in navLinks" :key="`nav-${index}`">
            <UDivider class="my-4" />
            <div v-if="!sidenavCollapsed" class="sidenav-menu">
              <UVerticalNavigation :links="link">
                <template #icon="{ link: l }">
                  <IconCSS :name="l.icon" class="!h-5 !w-5" />
                </template>
              </UVerticalNavigation>
            </div>
            <div v-else class="flex flex-col">
              <UTooltip
                v-for="(l, linkId) in link" :key="`nav-${index}-${linkId}`" :text="l.label"
                :popper="{ placement: 'right' }" class="text-md"
              >
                <UButton
                  :to="l.to"
                  class="sidenav-menu-button"
                  active-class="
                      text-primary-500 dark:text-primary-400
                      hover:!text-primary-500 dark:hover:!text-primary-400
                      bg-primary-300/50 dark:bg-primary-800/50
                      hover:!bg-primary-300/50 dark:hover:!bg-primary-800/50
                    " variant="ghost"
                >
                  <template #leading>
                    <IconCSS :name="l.icon" class="!h-5 !w-5" />
                  </template>
                </UButton>
              </UTooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.sidenav-container {
  @apply py-2;
  @apply px-4;
  @apply h-full;
  @apply rounded-md;
  @apply bg-white;
  @apply dark:bg-gray-900;
  @apply ring-1;
  @apply ring-gray-200;
  @apply dark:ring-gray-800;
  @apply shadow;
}

.sidenav-wrapper {
  @apply flex;
  @apply flex-col;
  @apply justify-between;
  @apply h-full;
}

.sidenav-logo {
  @apply flex;
  @apply flex-row;
  @apply justify-between;
  @apply items-center;
  @apply my-4;
}

.sidenav-menu {
  :deep(li) {
    @apply !mb-2;
  }

  &-button {
    @apply px-3;
    @apply py-2;
    @apply my-1;
    @apply text-gray-500;
    @apply dark:text-gray-500;
    @apply hover:text-gray-900;
    @apply dark:hover:text-white;
    @apply bg-gray-50;
    @apply dark:bg-gray-900;
    @apply hover:bg-gray-200/50;
    @apply dark:hover:bg-gray-800/50;
  }
}
</style>
