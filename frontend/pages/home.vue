<script lang="ts" setup>
const features = [
  {
    name: "Statistics table",
    description:
      "We provide a comprehensive table that displays data in an easy-to-read format. You can sort the table by various categories such as date, location, and category to find the information you need quickly.",
    icon: "📊",
  },
  {
    name: "Interactive map",
    description:
      "There is also an interactive map that allows you to visualize data by location.",
    icon: "🗺️",
  },
  {
    name: "24 x 7 x 365 Support",
    description:
      "If you have any questions or need help with our service, our contact page is the best place to start. Our customer support team is available to assist you with any issues you may encounter.",
    icon: "✉️",
  },
];
</script>
<template>
  <Title>Home - COVID-19 World Cases Statistics</Title>
  <section class="bg-gray-50">
    <div
      class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-4xl lg:items-center"
    >
      <div class="mx-auto max-w-xl text-center">
        <h1 class="text-3xl font-extrabold sm:text-5xl">
          Welcome to
          <strong class="font-extrabold text-red-700 sm:block">
            COVID-19
          </strong>
          statistics website!
        </h1>

        <p class="mt-4 sm:text-xl/relaxed">
          Here, you can view up-to-date information on the number of cases,
          recoveries, and deaths related to the virus in your country, or even
          around the world.
        </p>
      </div>
    </div>
  </section>

  <section class="bg-gray-900 text-white">
    <div class="max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-36 lg:px-38">
      <div class="max-w-xl">
        <h2 class="text-3xl font-bold sm:text-4xl">
          Here are some of the key features of our service
        </h2>

        <p class="mt-4 text-gray-300">
          We provide a powerful and easy-to-use service that helps you view
          statistics and data on a variety of topics. Our platform offers a
          unique combination of features that make it an essential tool for
          businesses, researchers, and anyone who needs to access data quickly
          and efficiently.
        </p>
      </div>

      <div
        class="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3"
      >
        <div
          v-for="feature in features"
          :key="feature.name"
          class="flex items-start gap-4"
        >
          <span class="shrink-0 rounded-lg bg-gray-800 p-4 text-5xl">
            {{ feature.icon }}
          </span>

          <div>
            <h2 class="text-lg font-bold">{{ feature.name }}</h2>

            <p class="mt-1 text-sm text-gray-300">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
