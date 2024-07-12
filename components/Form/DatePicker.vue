<script setup lang="ts">
type DatePickerDate = string | Date
const props = defineProps({
  start: {
    type: String as PropType<DatePickerDate>,
    default: undefined,
  },
  end: {
    type: String as PropType<DatePickerDate>,
    default: undefined,
  },
})

const emits = defineEmits<{
  (e: 'update:start' | 'update:end', value?: DatePickerDate): void
}>()

const dayjs = useDayjs()

const open = ref(false)
const rangeValue = ref('')
const model = computed<any>({
  get() {
    return {
      start: props.start,
      end: props.end,
    }
  },
  set(value) {
    emits('update:start', dayjs(value.start).format('YYYY-MM-DD'))
    emits('update:end', dayjs(value.end).format('YYYY-MM-DD'))
    rangeValue.value = `${dayjs(value.start).format('DD MMMM YYYY')} - ${dayjs(value.end).format('DD MMMM YYYY')}`
    open.value = false
  },
})

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
</script>

<template>
  <div class="relative">
    <div class="absolute z-10 w-full h-full cursor-pointer" @click="open = true" />
    <UPopover v-model:open="open" :popper="{ placement: 'bottom-start' }">
      <UFormGroup class="lg:mr-2 w-full">
        <UInput
          readonly
          :value="rangeValue"
          icon="i-heroicons-calendar"
          size="lg"
          placeholder="Select date"
        />
      </UFormGroup>
      <template #panel="{ close }">
        <div class="flex">
          <VDatePicker
            v-model.range="model"
            expanded
            :is-dark="isDark"
            :attributes="attrs"
            :color="selectedColor" title-position="left" :columns="2" mode="date"
            @close="close"
          />
        </div>
      </template>
    </UPopover>
  </div>
</template>

<style scoped lang="postcss"></style>
