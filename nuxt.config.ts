// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    // eslint-disable-next-line node/prefer-global/process
    apiUrl: process.env.NUXT_API_URL,
    public: {
      siteTitle: 'Carboard',
    },
  },
  colorMode: {
    preference: 'light',
  },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@samk-dev/nuxt-vcalendar',
    'nuxt-echarts',
    'dayjs-nuxt',
  ],
  imports: {
    dirs: ['stores', 'composables/api'],
  },
  css: ['~/assets/css/main.css'],
})
