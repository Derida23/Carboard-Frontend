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
  <div class="product">
    <UBreadcrumb :links="ProductDetailLinks" />
    <UCard class="p-10">
      <section class="product-wrapper">
        <div>
          <h2>{{ product?.data.name }}</h2>
          <div class="product-name">
            <span class="text-sm">Rp.</span>
            <div class="flex items-end">
              <h4>{{ toMoney(product?.data.price ?? 0) }} </h4>/day
            </div>
          </div>
          <img :src="product?.data.image" alt="image" class="w-[30rem] mt-5">
        </div>
        <div>
          <h4>Description</h4>
          <p class="product-description">
            {{ product?.data.description }}
          </p>
          <section class="product-detail-wrapper">
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
          <section class="product-detail-wrapper">
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
          <section class="product-detail-wrapper">
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
      <section class="product-button">
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

<style scoped lang="postcss">
.product {
  @apply flex;
  @apply flex-col;
  @apply gap-y-5;

  &-wrapper {
    @apply grid;
    @apply grid-cols-2;
    @apply gap-x-5;
  }

  &-name {
    @apply flex;
    @apply mt-1;
    @apply text-orange-500;
  }

  &-description {
    @apply mt-2;
    @apply text-sm;
    @apply text-slate-600;
  }

  &-button {
    @apply flex;
    @apply justify-end;
    @apply gap-x-2;
    @apply mt-5;
  }

  &-detail-wrapper {
    @apply grid;
    @apply grid-cols-2;
    @apply gap-x-5;
  }

}
</style>
