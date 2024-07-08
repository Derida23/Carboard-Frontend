import type { Pinia } from 'pinia'
import { deleteCookie, getCookie, sendRedirect } from 'h3'

export default defineNuxtPlugin(async ({ $pinia, ssrContext }) => {
  const event: any = ssrContext?.event

  const { checkCredentials } = useAuthStore($pinia as Pinia)
  const token = getCookie(event, 'user/token')

  if (token) {
    const { error } = await checkCredentials()

    if (error.value) {
      if (error.value.statusCode === 401) {
        deleteCookie(event, 'user/token')
        sendRedirect(event, '/dashboard/auth/login')
      }

      if (error.value.statusCode === 403) {
        throw showError({
          statusCode: 403,
          data: {
            image: '/images/error/401.svg',
            title: 'Access Denied',
            message:
                  'We\'re sorry, but it seems you don\'t have the necessary access rights to view this page.',
            button: {
              label: 'Logout',
              action: '/auth/logout',
            },
          },
          fatal: true,
        })
      }

      throw showError({
        statusCode: error.value.statusCode && error.value.statusCode < 500
          ? error.value.statusCode
          : 500,
        fatal: true,
      })
    }
  }
})
