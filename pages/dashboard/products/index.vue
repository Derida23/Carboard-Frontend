<script setup lang="ts">
import { ProductLinks } from '~/constants/breadcrumb'
import { ProductColumns } from '~/constants/table'
import type { FilterData } from '~/types/responses/filter-response'

definePageMeta({
  layout: 'dashboard',
  title: 'Products',
})

useHead({
  title: 'Products',
})

interface Params {
  name: string
  id_fuel?: string
  id_mark?: string
  id_transmission?: string
  id_type?: string
}

const search = ref('')
const params = ref<Params>({
  name: '',
  id_fuel: undefined,
  id_mark: undefined,
  id_transmission: undefined,
  id_type: undefined,
})
const options = ref({
  id_fuel: [],
  id_mark: [],
  id_transmission: [],
  id_type: [],
})
const filter = ref<FilterData>({
  fuels: [],
  marks: [],
  types: [],
  transmissions: [],
})

const debounceSearch = useDebounce(search, 500)
watch(debounceSearch, (value) => {
  params.value.name = value
})

const { findAll } = useApiProduct()
const { data: products } = await findAll(params.value)

const { findAll: findFilter } = useApiFilter()
const { data: dataFilter } = await findFilter()

filter.value = {
  fuels: dataFilter.value?.data.fuels ?? [],
  marks: dataFilter.value?.data.marks ?? [],
  types: dataFilter.value?.data.types ?? [],
  transmissions: dataFilter.value?.data.transmissions ?? [],
}

// Watchers for Options
function watchOption<K extends keyof typeof options.value, P extends keyof Params>(key: K, paramKey: P) {
  watch(() => options.value[key], (value) => {
    params.value[paramKey] = value.length > 0 ? JSON.stringify(value) : undefined
  })
}

watchOption('id_type', 'id_type')
watchOption('id_fuel', 'id_fuel')
watchOption('id_mark', 'id_mark')
watchOption('id_transmission', 'id_transmission')
</script>

<template>
  <div class="products">
    <UBreadcrumb :links="ProductLinks" />
    <section>
      <UCard>
        <div class="grid grid-cols-5 gap-x-4">
          <UInput
            v-model="search"
            icon="i-heroicons-magnifying-glass"
            placeholder="Search..."
            size="lg"
          />
          <USelectMenu
            v-model="options.id_type"
            :options="filter.types"
            placeholder="Select category..."
            size="lg"
            option-attribute="name"
            value-attribute="id"
            multiple
          />
          <USelectMenu
            v-model="options.id_fuel"
            :options="filter.fuels"
            placeholder="Select fuel..."
            size="lg"
            option-attribute="name"
            value-attribute="id"
            multiple
          />
          <USelectMenu
            v-model="options.id_mark"
            :options="filter.marks"
            placeholder="Select mark..."
            size="lg"
            option-attribute="name"
            value-attribute="id"
            multiple
          />
          <USelectMenu
            v-model="options.id_transmission"
            :options="filter.transmissions"
            placeholder="Select transmission..."
            size="lg"
            option-attribute="name"
            value-attribute="id"
            multiple
          />
        </div>
      </UCard>
    </section>
    <UCard>
      <UTable :rows="products?.data" :columns="ProductColumns">
        <template #no-data="{ index }">
          {{ index + 1 }}
        </template>
        <template #actions-header="{ column }">
          <p class="text-center">
            {{ column.label }}
          </p>
        </template>
        <template #actions-data>
          <div class="flex flex-row gap-x-2 justify-center">
            <UButton color="red" variant="outline" icon="i-heroicons-trash">
              Delete
            </UButton>
            <UButton icon="i-heroicons-pencil-square">
              Edit
            </UButton>
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<style scoped lang="postcss">
.products {
  @apply flex;
  @apply flex-col;
  @apply gap-y-5;
}
</style>
