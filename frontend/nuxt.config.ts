// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    backendEndpoint: "http://127.0.0.1:8000/api",
  },
  // https://nuxt.com/docs/guide/concepts/rendering#route-rules
  routeRules: {
    // Static page generated on-demand once
    "/": {
      prerender: true,
      redirect: { to: "/home", statusCode: 301 },
    },

    // Static page generated on-demand once
    "/home": { prerender: true },

    "/contact": { prerender: true },

    // Render these routes on the client (SPA)
    "/statistics": { ssr: false },
  },
  modules: [
    // add unocss
    "@unocss/nuxt",
  ],
  css: [
    // style resetting
    "@unocss/reset/tailwind.css",
  ],
});
