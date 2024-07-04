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
  modules: ["@nuxt/ui"],
  css: ['~/assets/css/main.css']
})