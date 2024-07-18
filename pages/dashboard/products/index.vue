<script setup lang="ts">
import { ProductLinks } from '~/constants/breadcrumb'
import { ProductColumns } from '~/constants/table'
import type { FilterData } from '~/types/responses/filter-response'
import type { Notification } from '~/types'

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
  page: number
}

const search = ref('')
const params = ref<Record<string, string | number | undefined> & Params>({
  name: '',
  id_fuel: undefined,
  id_mark: undefined,
  id_transmission: undefined,
  id_type: undefined,
  page: 1,
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

const { findAll, remove } = useApiProduct()
const { data: products, status, refresh } = await findAll(params.value)

const { findAll: findFilter } = useApiFilter()
const { data: dataFilter } = await findFilter()

filter.value = {
  fuels: dataFilter.value?.data.fuels ?? [],
  marks: dataFilter.value?.data.marks ?? [],
  types: dataFilter.value?.data.types ?? [],
  transmissions: dataFilter.value?.data.transmissions ?? [],
}

// Watchers for Options
function watchOption(key: string) {
  watch(() => options.value[key as keyof typeof options.value], (value) => {
    params.value[key as keyof typeof params.value] = value.length > 0 ? JSON.stringify(value) : undefined
  })
}

watchOption('id_type')
watchOption('id_fuel')
watchOption('id_mark')
watchOption('id_transmission')

// Modal Function
const modal = reactive({
  delete: false,
  notification: false,
})
const loading = ref(false)
const productId = ref(0)

function onOpenRemove(id: number) {
  modal.delete = true
  productId.value = id
}
async function onRemove() {
  modal.delete = false
  loading.value = true

  if (productId.value) {
    await remove(productId.value, {
      onSuccess: () => {
        loading.value = false
        onNotification('success', 'Great!', 'Your data has been successfully deleted.')
        refresh()
      },
      onError: (error) => {
        loading.value = false
        onNotification('error', 'Error', error.body.message)
      },
    })
  }
}

const notification: Notification = reactive({
  status: 'warning',
  title: 'Forgot Password?',
  description: 'Lorem ipsum',
})

function onNotification(type: 'warning' | 'error' | 'success', title: string, description: string) {
  modal.notification = true
  Object.assign(notification, { status: type, title, description })
}
</script>

<template>
  <div class="products">
    <UBreadcrumb :links="ProductLinks" />
    <section>
      <UCard>
        <div class="products-filter">
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
    <div class="flex justify-end ">
      <UButton
        icon="i-heroicons-plus"
        size="lg"
        @click="$router.push('/dashboard/products/create')"
      >
        Add Product
      </UButton>
    </div>
    <UCard>
      <UTable
        :rows="products?.data"
        :columns="ProductColumns"
        :loading="status === 'pending'"
      >
        <template #no-data="{ index }">
          {{ index + 1 }}
        </template>
        <template #actions-header="{ column }">
          <p class="text-center">
            {{ column.label }}
          </p>
        </template>
        <template #actions-data="{ row }">
          <div class="products-table-actions">
            <UButton color="red" variant="outline" icon="i-heroicons-trash" @click="onOpenRemove(row.id)">
              Delete
            </UButton>
            <UButton icon="i-heroicons-pencil-square">
              Edit
            </UButton>
          </div>
        </template>
      </UTable>

      <div class="products-table-pagination">
        <UPagination v-model="params.page" :page-count="10" :total="products?.meta.total" />
      </div>
    </UCard>

    <ModalDelete
      v-model="modal.delete"
      :loading
      @submit="onRemove"
      @close="modal.delete = false"
    >
      Are you sure? you would like to delete this product from the database? this action can't be undone
    </ModalDelete>
  </div>
</template>

<style scoped lang="postcss">
.products {
  @apply flex;
  @apply flex-col;
  @apply gap-y-5;

  &-filter {
    @apply grid;
    @apply grid-cols-5;
    @apply gap-x-4;
  }

  &-table {
    &-actions {
      @apply flex;
      @apply flex-row;
      @apply gap-x-2;
      @apply justify-center;
    }

    &-pagination {
      @apply flex;
      @apply justify-end;
      @apply px-3;
      @apply py-3.5;
      @apply border-t;
      @apply border-gray-200;
      @apply dark:border-gray-700;
    }
  }
}
</style>
