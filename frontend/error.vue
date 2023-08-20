<script setup>
const handleError = () => clearError({ redirect: "/home" });
</script>

<template>
  <div class="grid h-screen px-4 bg-white place-content-center">
    <div class="text-center">
      <span class="text-100px">🥲</span>

      <h1
        class="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl"
      >
        Uh-oh!
      </h1>

      <p class="mt-4 text-gray-500">We can't find that page.</p>
      <button
        @click="handleError"
        class="mt-8 inline-block w-full rounded-lg bg-blue-500 hover:bg-blue-600 p-2.5 text-white sm:w-auto"
      >
        Back to home
      </button>
    </div>
  </div>
</template>
