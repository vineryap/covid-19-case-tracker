import { defineConfig, presetAttributify, presetUno } from "unocss";
import { presetForms } from "@julr/unocss-preset-forms";

export default defineConfig({
  presets: [presetAttributify(), presetUno(), presetForms()],
});
