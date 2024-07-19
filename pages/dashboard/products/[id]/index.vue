<script setup lang="ts">
import { ProductDetailLinks } from '~/constants/breadcrumb'

definePageMeta({
  layout: 'dashboard',
  title: 'Product Detail',
})

useHead({
  title: 'Product Detail',
})

const route = useRoute()
const router = useRouter()

const { findId } = useApiProduct()
const { data: product } = await findId(+route.params.id)
</script>

<template>
  <div class="flex flex-col gap-y-5">
    <UBreadcrumb :links="ProductDetailLinks" />
    <UCard class="p-10">
      <section class="grid grid-cols-2 gap-x-5">
        <div>
          <h2>{{ product?.data.name }}</h2>
          <div class="flex mt-1 text-orange-500">
            <span class="text-sm">Rp.</span>
            <div class="flex items-end">
              <h4>{{ toMoney(product?.data.price ?? 0) }} </h4>/day
            </div>
          </div>
          <img :src="product?.data.image" alt="image" class="w-[30rem] mt-5">
        </div>
        <div>
          <h4>Description</h4>
          <p class="mt-2 text-sm text-slate-600">
            {{ product?.data.description }}
          </p>
          <section class="grid grid-cols-2 mt-5">
            <div>
              <h5>
                Category
              </h5>
              <p>{{ capitalize(product?.data.type.name ?? "") }}</p>
            </div>
            <div>
              <h5>
                Mark
              </h5>
              <p>{{ capitalize(product?.data.mark.name ?? "") }}</p>
            </div>
          </section>
          <section class="grid grid-cols-2 mt-5">
            <div>
              <h5>
                Transmission
              </h5>
              <p>{{ capitalize(product?.data.transmission.name ?? "") }}</p>
            </div>
            <div>
              <h5>
                Fuel
              </h5>
              <p>{{ capitalize(product?.data.fuel.name ?? "") }}</p>
            </div>
          </section>
          <section class="grid grid-cols-2 mt-5">
            <div>
              <h5>
                Seat
              </h5>
              <p>{{ product?.data.seat }}</p>
            </div>
            <div class="flex items-center">
              <UBadge color="primary" variant="outline" class="w-fit h-fit" size="lg">
                <UIcon name="i-heroicons-check-badge" class="w-5 h-5 mr-1" />
                Car is available!
              </UBadge>
            </div>
          </section>
        </div>
      </section>
      <section class="flex justify-end gap-x-2 mt-5">
        <UButton size="lg" variant="outline" to="/dashboard/products">
          Back
        </UButton>
        <UButton size="lg" type="submit" @click="router.push(`/dashboard/products/${product?.data.id}/edit`)">
          Edit Product
        </UButton>
      </section>
    </UCard>
  </div>
</template>

<style scoped lang="postcss"></style>
