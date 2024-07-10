<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  title: 'Fuels',
})

useHead({
  title: 'Fuels',
})

const columns = [{
  key: 'id',
  label: 'ID',
}, {
  key: 'name',
  label: 'Name',
}, {
  key: 'description',
  label: 'Description',
}, {
  key: 'created',
  label: 'Created',
}, {
  key: 'actions',
  label: 'Actions',
}]

const people = [{
  id: 1,
  name: 'Lindsay Walton',
  description: 'Lorem ipsum is placeholder text commonly used in the graphic',
  created: '20 January 2024',
  actions: 'Member',
}, {
  id: 2,
  name: 'Courtney Henry',
  description: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
  created: '21 January 2024',
  actions: 'Admin',
}, {
  id: 3,
  name: 'Tom Cook',
  description: 'Lorem ipsum is placeholder text commonly used in the graphic',
  created: '22 January 2024',
  actions: 'Member',
}, {
  id: 4,
  name: 'Whitney Francis',
  description: 'Lorem ipsum is placeholder text commonly used in the graphic',
  created: '23 January 2024',
  actions: 'Admin',
}, {
  id: 5,
  name: 'Leonard Krasner',
  description: 'Lorem ipsum is placeholder text commonly used in the graphic',
  created: '24 January 2024',
  actions: 'Owner',
}]

const links = [{
  label: 'Dashboard',
  icon: 'i-heroicons-home',
  to: '/dashboard',
}, {
  label: 'Fuels',
  icon: 'i-heroicons-beaker',
}]

const search = ref(null)
const range = ref({
  start: new Date(),
  end: new Date(),
})

const isDeleteOpen = ref(false)
const isOpen = ref(false)
const status = ref('Create')

const dataUpdate = reactive({
  id: null,
  name: null,
  description: null,
})

function onModal(title: string, row: any = null) {
  isOpen.value = true
  status.value = title

  dataUpdate.id = row?.id
  dataUpdate.name = row?.name
  dataUpdate.description = row?.description
}
</script>

<template>
  <div class="fuels">
    <UBreadcrumb :links="links" />
    <UCard>
      <div class="fuels-filter ">
        <UInput
          v-model="search"
          class="col-span-3"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search..."
          size="lg"
        />
        <div class="fuels-filter-date">
          <div class="col-span-3">
            <FormDatePicker v-model="range" />
          </div>
          <UButton
            icon="i-heroicons-adjustments-horizontal"
            variant="outline"
            block
          >
            Filter
          </UButton>
        </div>
        <UButton
          icon="i-heroicons-plus"
          block
          size="lg"
          @click="onModal('Create')"
        >
          Add Fuels
        </UButton>
      </div>
    </UCard>

    <UCard>
      <FormTable :columns :rows="people" @delete="isDeleteOpen = true" @edit="onModal('Update', $event)" />
    </UCard>

    <ModalDelete v-model="isDeleteOpen">
      Are you sure? you would like to delete this fuel from the database? this action can't be undone
    </ModalDelete>

    <ModalFuel v-model="isOpen" :title="status" :data-update="dataUpdate" />
  </div>
</template>

<style scoped lang="postcss">
.fuels {
  @apply flex;
  @apply flex-col;
  @apply gap-y-5;

  &-filter {
    @apply grid;
    @apply grid-cols-7;
    @apply gap-5;

    &-date {
      @apply grid;
      @apply grid-cols-4;
      @apply gap-2;
      @apply col-span-3;
    }
  }
}
</style>
