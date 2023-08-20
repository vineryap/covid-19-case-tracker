// Looks like this is the only way to make this package work with Nuxt when doing hybrid rendering.
// @ts-ignore
import svgMap from "svgmap";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      svgMap,
    },
  };
});
