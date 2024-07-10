<script setup lang="ts">
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
    type: Array,
    required: true,
  },
})

const emits = defineEmits<{
  (e: 'delete', row: any): void
  (e: 'edit', row: any): void
}>()
</script>

<template>
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
      {{ $dayjs(row.created_at).format("DD MMMM YYYY") }}
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
}
</style>
