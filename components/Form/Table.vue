<script setup lang="ts">
import type { UomData } from '~/types/responses/uom-response'

interface TableColumn {
  label: string
  key: string
}

const props = defineProps({
  columns: {
    type: Array as PropType<TableColumn[]>,
    required: true,
  },
  rows: {
    type: Array as PropType<Record<string, any>[] | undefined>,
    required: true,
  },
  total: {
    type: Number,
    default: 100,
  },
})

const emits = defineEmits<{
  (e: 'delete', row: Record<string, any>): void
  (e: 'edit', row: Record<string, any>): void
}>()

const page = defineModel('page', {
  default: 1,
})
</script>

<template>
  <div>
    <UTable
      :columns="props.columns"
      :rows
      class="uom-table"
      :ui="{ td: { base: 'max-w-[0] truncate' } }"
    >
      <template #actions-header="{ column }">
        <p class="text-center">
          {{ column.label }}
        </p>
      </template>
      <template #no-data="{ index }">
        {{ index + 1 }}
      </template>
      <template #created_at-data="{ row }">
        {{ $dayjs(row.created_at).format("DD MMMM YYYY - HH:mm:ss") }}
      </template>
      <template #actions-data="{ row }">
        <div class="uom-table-actions">
          <UButton color="red" variant="outline" icon="i-heroicons-trash" @click="emits('delete', row)">
            Delete
          </UButton>
          <UButton icon="i-heroicons-pencil-square" @click="emits('edit', row)">
            Edit
          </UButton>
        </div>
      </template>
    </UTable>

    <div class="uom-table-pagination">
      <UPagination v-model="page" :page-count="10" :total="total" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.uom-table {
  @apply w-full;

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
</style>
