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

const emit = defineEmits(['delete', 'edit'])
</script>

<template>
  <UTable
    :columns="props.columns"
    :rows
    class="w-full"
    :ui="{ td: { base: 'max-w-[0] truncate' } }"
  >
    <template #actions-header="{ column }">
      <p class="text-center">
        {{ column.label }}
      </p>
    </template>
    <template #actions-data="{ row }">
      <div class="flex flex-row gap-x-2 justify-center">
        <UButton color="red" variant="outline" icon="i-heroicons-trash" @click="emit('delete')">
          Delete
        </UButton>
        <UButton icon="i-heroicons-pencil-square" @click="emit('edit', row)">
          Edit
        </UButton>
      </div>
    </template>
  </UTable>
</template>

<style scoped lang="postcss"></style>
