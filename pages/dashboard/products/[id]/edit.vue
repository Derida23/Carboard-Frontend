<script setup lang="ts">
import { ProductEditLinks } from '~/constants/breadcrumb'
import type { FilterData } from '~/types/responses/filter-response'
import type { ProductPayload } from '~/types/responses/product-response'
import { ProductSchema } from '~/schemas/product-schema'
import type { Notification } from '~/types'

definePageMeta({
  layout: 'dashboard',
  title: 'Edit Product',
})

useHead({
  title: 'Edit Product',
})
const route = useRoute()

const { findId, update } = useApiProduct()
const { data: product } = await findId(+route.params.id)
const { findAll: findFilter } = useApiFilter()
const { data: dataFilter } = await findFilter()

const loading = ref(false)
const filter = ref<FilterData>({
  fuels: [],
  marks: [],
  types: [],
  transmissions: [],
})

filter.value = {
  fuels: dataFilter.value?.data.fuels ?? [],
  marks: dataFilter.value?.data.marks ?? [],
  types: dataFilter.value?.data.types ?? [],
  transmissions: dataFilter.value?.data.transmissions ?? [],
}

const payload = reactive<ProductPayload>({
  name: undefined,
  description: undefined,
  price: undefined,
  seat: undefined,
  id_type: undefined,
  id_mark: undefined,
  id_transmission: undefined,
  id_fuel: undefined,
  image: undefined as File | undefined,
})
const image = ref({
  isEmptyFile: false,
  preview: '',
})

if (product.value) {
  const {
    name,
    description,
    price,
    seat,
    id_type,
    id_mark,
    id_transmission,
    id_fuel,
  } = product.value?.data

  Object.assign(payload, {
    name,
    description,
    price,
    seat,
    id_type,
    id_mark,
    id_transmission,
    id_fuel,
  })
}

image.value.preview = product.value?.data.image ?? ''

const fileInput = ref()
function triggerFileInput() {
  fileInput.value.click()
}

function onImageUpload(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    payload.image = file

    const reader = new FileReader()
    reader.onload = () => {
      image.value.preview = reader.result as string
      image.value.isEmptyFile = false
    }
    reader.readAsDataURL(file)
  }
}
async function onSubmit() {
  loading.value = true
  await update(+route.params.id, payload, {
    onSuccess: () => {
      loading.value = false
      onNotification('success', 'Great!', 'Your data has been successfully updated.')
    },
    onError: (error) => {
      loading.value = false
      onNotification('error', 'Error', error.body.message)
    },
  })
}
const isNotification = ref(false)
const notification: Notification = reactive({
  status: 'warning',
  title: 'Forgot Password?',
  description: 'Lorem ipsum',
})

function onNotification(type: 'warning' | 'error' | 'success', title: string, description: string) {
  isNotification.value = true
  Object.assign(notification, { status: type, title, description })
}
</script>

<template>
  <div class="product-edit">
    <UBreadcrumb :links="ProductEditLinks" />
    <UForm :schema="ProductSchema" :state="payload" enctype="multipart/form-data" @submit="onSubmit">
      <UCard>
        <div class="edit-form-1">
          <div class="edit-form-wrapper">
            <UFormGroup label="Name" name="name">
              <UInput v-model="payload.name" size="lg" placeholder="Please input name..." />
            </UFormGroup>
            <UFormGroup label="Description" name="description">
              <UTextarea v-model="payload.description" size="lg" rows="5" placeholder="Please input description..." />
            </UFormGroup>
            <UFormGroup label="Price" name="price">
              <UInput v-model="payload.price" size="lg" placeholder="Please input price..." type="number" />
            </UFormGroup>
          </div>
          <div>
            <div class="edit-form-image">
              <div class="edit-form-image-upload flex-center">
                <img
                  v-if="image.preview" :src="image.preview" alt="Uploaded Image Preview"
                  class="edit-form-image-preview"
                >
                <div
                  v-else class="edit-form-image-file" :class="{ 'border-red-500 !bg-red-100': image.isEmptyFile }"
                  @click="triggerFileInput"
                >
                  <div class="edit-form-image-text flex-center">
                    <UIcon name="i-heroicons-cloud-arrow-up" class="w-10 h-10 text-orange-400" />
                    <h4 class="text-center">
                      Upload Image
                    </h4>
                    <input ref="fileInput" type="file" class="hidden" @change="onImageUpload">
                  </div>
                </div>
              </div>
              <div class="edit-form-image-noted">
                <UButton
                  v-if="image.preview" color="red" variant="ghost" icon="i-heroicons-trash"
                  @click="image.preview = ''"
                >
                  Delete
                </UButton>
                <div v-else />
                <p class="text-end italic text-sm">
                  <span class="text-red-500">*</span>please upload image jpg/png and horizontal scale
                </p>
              </div>
            </div>
          </div>
        </div>
      </UCard>
      <UCard class="mt-5">
        <div class="grid grid-cols-2 gap-x-5">
          <div class="edit-form-wrapper">
            <UFormGroup label="Seat" name="seat">
              <UInput v-model="payload.seat" size="lg" placeholder="Please input seat..." type="number" />
            </UFormGroup>
            <UFormGroup label="Category" name="id_type">
              <USelectMenu
                v-model="payload.id_type" :options="filter.types" placeholder="Select category..." size="lg"
                option-attribute="name" value-attribute="id"
              />
            </UFormGroup>
            <UFormGroup label="Mark" name="id_mark">
              <USelectMenu
                v-model="payload.id_mark" :options="filter.marks" placeholder="Select mark..." size="lg"
                option-attribute="name" value-attribute="id"
              />
            </UFormGroup>
          </div>
          <div class="edit-form-wrapper relative">
            <UFormGroup label="Transmission" name="id_transmission">
              <USelectMenu
                v-model="payload.id_transmission" :options="filter.transmissions"
                placeholder="Select transmission..." size="lg" option-attribute="name" value-attribute="id"
              />
            </UFormGroup>
            <UFormGroup label="Fuel" name="id_fuel">
              <USelectMenu
                v-model="payload.id_fuel" :options="filter.fuels" placeholder="Select fuel..." size="lg"
                option-attribute="name" value-attribute="id"
              />
            </UFormGroup>
            <div class="edit-form-submit">
              <UButton size="lg" variant="outline" :disabled="loading" to="/dashboard/products">
                Cancel
              </UButton>
              <UButton size="lg" type="submit" :loading="loading">
                Edit Product
              </UButton>
            </div>
          </div>
        </div>
      </UCard>
    </UForm>

    <ModalNotification
      v-model="isNotification" :prevent-close="notification.status === 'success'"
      :status="notification.status" :title="notification.title" link="/dashboard/products"
      @close="isNotification = false"
    >
      <div v-html="notification.description" />
    </ModalNotification>
  </div>
</template>

<style scoped lang="postcss">
.product-edit {
  @apply flex;
  @apply flex-col;
  @apply gap-y-5;

  .edit {
    &-form-1 {
      @apply grid grid-cols-2 gap-x-5;
    }

    &-form-wrapper {
      @apply flex;
      @apply flex-col;
      @apply gap-y-5;
    }

    &-form-image {
      @apply px-10;
      @apply pt-10;
      @apply h-full;

      &-upload {
        @apply h-4/5;
        @apply relative;
      }

      &-preview {
        @apply w-full;
        @apply h-full;
        @apply absolute;
        @apply top-0;
        @apply rounded-3xl;
        @apply object-contain;
      }

      &-file {
        @apply cursor-pointer;
        @apply w-full;
        @apply h-full;
        @apply bg-orange-100/50;
        @apply hover:bg-orange-100;
        @apply rounded-3xl;
        @apply border-2;
        @apply border-orange-300;
        @apply border-dashed;
      }

      &-text {
        @apply h-full;
        @apply gap-x-4;
      }

      &-noted {
        @apply flex;
        @apply items-center;
        @apply justify-between;
        @apply mt-3;
      }
    }

    &-form-submit {
      @apply flex;
      @apply flex-row;
      @apply gap-x-2;
      @apply justify-end;
      @apply absolute;
      @apply bottom-0;
      @apply right-0;
    }
  }
}

.upload-container {
  @apply flex;
  @apply flex-col;
  @apply items-center;
}
</style>
