<script setup lang="ts">
const props = defineProps({
  disableCreate: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits<{
  (e: 'create'): void
}>()
const params = defineModel('params', { default: { name: '', start_date: undefined, end_date: undefined } })
const { feature } = storeToRefs(useGlobalStore())

const search = ref('')
const debounceSearch = useDebounce(search, 500)
watch(debounceSearch, (value) => {
  params.value.name = value
})
</script>

<template>
  <div class="filter ">
    <UInput
      v-model="search" class="col-span-3" icon="i-heroicons-magnifying-glass" placeholder="Search..."
      size="lg"
    />
    <div class="col-span-4">
      <FormDatePicker v-model:start="params.start_date" v-model:end="params.end_date" />
    </div>
    <UButton :disabled="props.disableCreate" class="col-span-2" icon="i-heroicons-plus" block size="lg" @click="emits('create')">
      Create {{ capitalize(feature) }}
    </UButton>
  </div>
</template>

<style scoped lang="postcss">
.filter {
  @apply grid;
  @apply grid-cols-9;
  @apply gap-5;

  &-date {
    @apply grid;
    @apply grid-cols-4;
    @apply gap-2;
    @apply col-span-3;
  }
}
</style>
