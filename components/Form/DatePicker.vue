<script setup lang="ts">
const dayjs = useDayjs()
const range = defineModel('range', { default: { start: new Date(), end: new Date() } })
const rangeValue = ref('')

const attrs = ref([
  {
    key: 'today',
    highlight: {
      color: 'orange',
      fillMode: 'outline',
    },
    dates: new Date(),
  },
])
const selectedColor = ref('orange')
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

watch(range, (value) => {
  if (value) {
    rangeValue.value = `${dayjs(range.value.start).format('DD MMMM YYYY')} - ${dayjs(range.value.end).format('DD MMMM YYYY')}`
  }
})
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UFormGroup class="lg:mr-2 w-full">
      <UInput readonly :value="rangeValue" icon="i-heroicons-calendar" size="lg" placeholder="Select date" />
    </UFormGroup>

    <template #panel>
      <div class="flex">
        <VDatePicker
          v-model.range="range" expanded :is-dark="isDark" :attributes="attrs"
          :color="selectedColor" title-position="left" :columns="2" mode="date"
        />
      </div>
    </template>
  </UPopover>
</template>

<style scoped lang="postcss"></style>
