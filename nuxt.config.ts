// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        shim: false,
    },
    plugins: [{ src: `~/plugins/notification.client.ts`, mode: "client"}]
})
