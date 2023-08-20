<script lang="ts" setup></script>

<template>
  <footer aria-label="Site Footer" class="bg-gray-100">
    <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="flex justify-center text-gray-900">
        <h1 class="text-2xl font-bold sm:text-3xl">
          <NuxtLink to="/home">VStat</NuxtLink>
        </h1>
      </div>

      <nav aria-label="Footer Nav" class="mt-12">
        <ul class="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <NuxtLink
              to="/home"
              class="text-gray-700 transition hover:text-gray-700/75"
            >
              Home
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              to="/statistics"
              class="text-gray-700 transition hover:text-gray-700/75"
            >
              COVID-19 Statistics
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              to="/contact"
              class="text-gray-700 transition hover:text-gray-700/75"
            >
              Contact
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="text-center mt-12">
        <p>
          <i
            >Made by
            <a href="mailto:vineryap@gmail.com" class="text-blue-500"
              >Vin E. R. Yap</a
            ></i
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
