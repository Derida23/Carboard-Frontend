<script setup lang="ts">
import type { z } from 'zod'
import { LoginSchema } from '~/schemas/auth-schema'
import type { FormSubmitEvent } from '#ui/types'
import { useApiAuth } from '~/composables/api/useApiAuth'
import type { Notification } from '~/types'
import type { LoginResponse } from '~/types/responses/auth-response'

definePageMeta({
  title: 'Login',
})

useHead({
  title: 'Login',
})

type Schema = z.output<typeof LoginSchema>

const { onSign } = useApiAuth()
const { checkCredentials } = useAuthStore()

const showPassword = ref(false)
const isOpenForgot = ref(false)
const isLoading = ref(false)
const state = reactive({
  email: undefined,
  password: undefined,
})
const notification: Notification = reactive({
  status: 'warning',
  title: 'Forgot Password?',
  description: 'Please contact admin via email <span class=\'font-bold\'>admin@gmail.com</span> for reset password your account',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  await onSign(event.data, {
    onSuccess: async (res) => {
      isLoading.value = false

      const token = useCookie<LoginResponse | unknown>(
        'user/token',
        {
          sameSite: 'none',
          secure: true,
          path: '/',
          httpOnly: false,
          expires: new Date(Date.now() + 60 * 60 * 1000),
        },
      )

      token.value = res.body.data.access_token
      await checkCredentials()
      await navigateTo('/dashboard')
    },
    onError: (error) => {
      isLoading.value = false
      onNotification('error', error.body.error, error.body.message)
    },
  })
}

function onNotification(type: 'warning' | 'error' | 'success', title: string, description: string) {
  isOpenForgot.value = true
  Object.assign(notification, { status: type, title, description })
}
</script>

<template>
  <div id="login">
    <section class="login-container">
      <div class="login-wrapper">
        <section class="login-title">
          <div class="flex-center w-full">
            <img src="~/assets/images/logo.png" alt="logo">
          </div>
          <h1>Welcome Back!</h1>
          <p>Please login to your account</p>
        </section>
        <UForm :schema="LoginSchema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" icon="i-heroicons-envelope" size="lg" placeholder="Please input email..." />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="state.password" :type="showPassword ? 'text' : 'password'" icon="i-heroicons-lock-closed"
              placeholder="Please input password..." :ui="{ icon: { trailing: { pointer: '' } } }" size="lg"
            >
              <template #trailing>
                <UButton
                  color="gray" variant="link" :icon="showPassword ? `i-heroicons-eye-slash` : `i-heroicons-eye`"
                  :padded="false" @click="showPassword = !showPassword"
                />
              </template>
            </UInput>
          </UFormGroup>

          <p
            class="login-forgot"
            @click="onNotification('warning', 'Forgot Password?', 'Please contact admin via email <span class=\'font-bold\'>admin@gmail.com</span> for reset password your account')"
          >
            Forgot password ?
          </p>

          <UButton size="lg" type="submit" block class="!mt-5" :loading="isLoading">
            Login
          </UButton>
        </UForm>
      </div>
    </section>
    <section class="login-bg">
      <div class="login-bg-card">
        <h1>Simplify <br> management with <br> our dashboard</h1>
        <p>Carboard Vehicles Rental specializes in providing <br>a wide range of rental vehicles</p>

        <div class="login-bg-image bg-red-400">
          <img src="~/assets/images/login-person-1.png" alt="login">
          <img src="~/assets/images/login-person-2.png" alt="login">
        </div>
      </div>
    </section>
  </div>

  <ModalNotification v-model="isOpenForgot" :status="notification.status" :title="notification.title">
    <div v-html="notification.description" />
  </ModalNotification>
</template>

<style scoped lang="postcss">
#login {
  @apply h-screen;
  @apply grid;
  @apply grid-cols-2;

  .login {
    &-container {
      @apply flex;
      @apply justify-center;
      @apply items-center;
    }

    &-wrapper {
      @apply w-1/2;
      @apply m-auto;
      @apply mx-5;
      @apply px-3;
      @apply py-5;
    }

    &-title {
      @apply text-center;

      p {
        @apply mt-2;
        @apply mb-5;
        @apply text-slate-800;
      }

      img {
        @apply w-36;
        @apply mb-5;
      }
    }

    &-forgot {
      @apply text-right;
      @apply cursor-pointer;
      @apply hover:text-orange-500
    }

    &-bg {
      @apply h-full;
      @apply py-10;
      @apply px-20;

      &-card {
        @apply relative;
        @apply bg-orange-50;
        @apply rounded-[3rem];
        @apply w-full;
        @apply h-full;
        @apply p-10;

        h1 {
          @apply pt-3;
          @apply pl-3;
          @apply text-5xl;
          @apply text-slate-800;
          @apply font-bold;
          @apply leading-tight;
        }

        p {
          @apply pt-5;
          @apply pl-3;
          @apply text-lg;
          @apply italic;

        }
      }

      img {
        @apply absolute;
        @apply bottom-0;
        @apply w-48;
      }

      img:first-child {
        @apply left-[8rem];
      }

      img:last-child {
        @apply right-[8rem];
      }
    }

  }

}
</style>
