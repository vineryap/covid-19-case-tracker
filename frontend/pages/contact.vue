<script lang="ts" setup>
import { ContactAPIResponse } from "~/types/contact";

const formData = reactive({
  name: "",
  email: "",
  message: "",
});

const formError = reactive({
  name: "",
  email: "",
  message: "",
});

const serverMessage = ref("");
const responseData = ref<ContactAPIResponse | null>(null);
const submitSuccess = ref(false);

async function sendMail() {
  // Reset form error messages when submit
  formError.name = "";
  formError.email = "";
  formError.message = "";
  serverMessage.value = "";
  submitSuccess.value = false;

  const { data } = await useLazyFetch<ContactAPIResponse>("/api/contact", {
    headers: { "Content-type": "application/json" },
    method: "POST",
    body: formData,
  });

  responseData.value = data.value;
}

watch(responseData, (data) => {
  if (data) {
    submitSuccess.value = data.success;
    serverMessage.value = data.message;

    // Reset form data if request is success
    if (data.success) {
      formData.name = "";
      formData.email = "";
      formData.message = "";
    } else {
      formError.name = data.validationMessage.name;
      formError.email = data.validationMessage.email;
      formError.message = data.validationMessage.message;
    }
  }
});
</script>

<template>
  <Title>Contact - COVID-19 World Cases Statistics</Title>

  <section class="bg-gray-900 py-10 px-5">
    <div
      class="mx-auto max-w-screen-xl min-h-screen px-4 py-16 sm:px-6 lg:px-8"
    >
      <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
        <div class="lg:col-span-2 lg:py-12">
          <p class="max-w-xl text-lg text-white">
            <span class="text-2xl font-bold text-pink-600"
              >Welcome to our contact page</span
            >, where you can reach out to us with any questions, comments, or
            concerns you may have about our COVID-19 statistics.<br /><br />

            If you're feeling under the weather and need some advice, please
            consult with your doctor. We're just a bunch of data nerds, and our
            medical expertise is limited to knowing which statistical models to
            use.<br /><br />

            On the other hand, if you're a superhero with the ability to cure
            diseases, please let us know. We could really use your help right
            now.<br /><br />

            Thank you for your understanding, and stay safe out there
            (preferably at a distance of at least 2 meter).
          </p>
        </div>

        <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          <form @submit.prevent="sendMail" class="space-y-4">
            <div>
              <label class="sr-only" for="name">Name</label>
              <input
                class="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Name"
                type="text"
                id="name"
                v-model="formData.name"
              />
              <p v-if="formError.name" class="text-red-500 mt-2">
                {{ formError.name }}
              </p>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="sr-only" for="email">Email</label>
                <input
                  class="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Email address"
                  type="email"
                  id="email"
                  v-model="formData.email"
                />
              </div>
            </div>
            <p v-if="formError.email" class="text-red-500 mt-2">
              {{ formError.email }}
            </p>

            <div>
              <label class="sr-only" for="message">Message</label>

              <textarea
                class="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Message"
                rows="8"
                id="message"
                v-model="formData.message"
              ></textarea>
              <p v-if="formError.message" class="text-red-500 mt-2">
                {{ formError.message }}
              </p>
            </div>

            <div class="mt-4">
              <button
                type="submit"
                class="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
              >
                Send Inquiry
              </button>
            </div>

            <div v-if="serverMessage" class="mt-4">
              <p :class="[submitSuccess ? 'text-green-500' : 'text-red-500']">
                {{ serverMessage }}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
