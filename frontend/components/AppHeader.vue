<script lang="ts" setup></script>

<template>
  <header aria-label="Page Header" class="border-b">
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="text-center sm:text-left">
          <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
            <NuxtLink to="/home">VStat</NuxtLink>
          </h1>

          <p class="mt-1.5 text-sm text-gray-500">
            Global COVID-19 case statistics
          </p>
        </div>

        <div
          class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center"
        >
          <nav
            class="flex-col flex-grow text-center md:flex md:justify-start md:flex-row"
          >
            <ul
              class="space-y-2 list-none lg:space-y-0 lg:items-center lg:inline-flex"
            >
              <li>
                <NuxtLink
                  to="/home"
                  class="transition-all p-2 lg:px-6 text-lg border-b-2 border-transparent md:px-3 text-gray-500"
                  hover="text-blue-500 border-blue-600"
                >
                  Home
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/statistics"
                  class="transition-all p-2 lg:px-6 text-lg border-b-2 border-transparent md:px-3 text-gray-500"
                  hover="text-blue-500 border-blue-600"
                >
                  COVID-19 Statistics
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/contact"
                  class="transition-all p-2 lg:px-6 text-lg border-b-2 border-transparent md:px-3 text-gray-500"
                  hover="text-blue-500 border-blue-600"
                >
                  Contact
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
