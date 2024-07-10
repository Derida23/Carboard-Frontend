<script setup lang="ts">
import type { z } from 'zod'
import { UomSchema } from '~/schemas/uom-schema'
import type { FormSubmitEvent } from '#ui/types'

// type Schema = z.output<typeof UomSchema>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  dataUpdate: {
    type: Object,
    default: () => {},
  },
})
const emits = defineEmits(['update:modelValue'])

const isOpen = defineModel('isOpen')
const state = reactive({
  id: 0,
  name: undefined,
  description: undefined,
})

function close() {
  resetData()
  emits('update:modelValue', false)
}
// function onSubmit(event: FormSubmitEvent<Schema>) {
function onSubmit() {
  resetData()
  emits('update:modelValue', false)
}
function resetData() {
  state.name = undefined
  state.description = undefined
}
watch(props.dataUpdate, (data) => {
  if (data) {
    state.id = data.id
    state.name = data.name
    state.description = data.description
  }
})
</script>

<template>
  <UModal v-model="isOpen">
    <div class="p-5">
      <div class="flex justify-between items-center">
        <div class="flex flex-row gap-x-2 items-center">
          <img v-if="!state.id" src="~/assets/images/save.png" alt="logo" class="w-10">
          <img v-else src="~/assets/images/update.png" alt="logo" class="w-10">
          <h4>{{ props.title }} Fuel</h4>
        </div>
        <UButton icon="i-heroicons-x-mark-20-solid" color="gray" variant="link" @click="close" />
      </div>
      <section>
        <UForm :schema="UomSchema" :state="state" class="space-y-4 mt-5" @submit="onSubmit">
          <UFormGroup label="Name" name="name">
            <UInput v-model="state.name" size="lg" placeholder="Please input name..." />
          </UFormGroup>

          <UFormGroup label="Description" name="description">
            <UTextarea v-model="state.description" size="lg" placeholder="Please input description..." rows="5" />
          </UFormGroup>

          <div class="grid grid-cols-2 gap-x-3 !mt-5">
            <UButton size="lg" variant="outline" block @click="close">
              Cancel
            </UButton>
            <UButton size="lg" type="submit" block>
              {{ !state.id ? 'Save' : 'Update' }}
            </UButton>
          </div>
        </UForm>
      </section>
    </div>
  </UModal>
</template>

<style scoped lang="postcss"></style>
