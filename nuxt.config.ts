// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    apiUrl: process.env.NUXT_API_URL,
    public: {
      siteTitle: 'Carboard',
    },
  },
  colorMode: {
    preference: 'light',
  },
  modules: [
    "@nuxt/ui", 
    '@pinia/nuxt',
  ],
  imports: {
    dirs: ['stores', 'composables/api'],
  },
  css: ['~/assets/css/main.css']
})