// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
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