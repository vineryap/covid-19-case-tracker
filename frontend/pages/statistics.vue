<script lang="ts" setup>
const selectedOption = ref("All");
const sortColumn = ref<ItemKey | "">("");
const sortDirection = ref<"asc" | "desc" | "none">("asc");

const { pending, data, refresh } = await useLazyFetch(
  "/api/covid19-statistics"
);

// Sort the data
const sortedItems = computed(() => {
  if (!data.value) return [];

  // make a copy to avoid side effect
  const cases = [...data.value?.covidCases];
  const columnName = sortColumn.value;

  if (columnName) {
    return cases.sort((a, b) => {
      let aValue = a[columnName];
      let bValue = b[columnName];
      if (aValue < bValue) return sortDirection.value === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection.value === "asc" ? 1 : -1;
      return 0;
    });
  } else {
    return cases;
  }
});

// Filter the data to be used in the table and map
const filteredItems = computed(() => {
  if (selectedOption.value.toLowerCase() === "all") return sortedItems.value;

  return selectedOption.value
    ? sortedItems.value.filter(
        (item) => item.Country_text === selectedOption.value
      )
    : sortedItems.value;
});

function sortBy(columnKey: ItemKey) {
  if (columnKey === sortColumn.value) {
    switch (sortDirection.value) {
      case "asc":
        sortDirection.value = "desc";
        break;

      case "desc":
        sortColumn.value = "";
        sortDirection.value = "none";
        break;

      default:
        sortDirection.value = "asc";
        break;
    }
  } else {
    sortColumn.value = columnKey;
    sortDirection.value = "asc";
  }
}

function selectChangeHandler() {
  sortColumn.value = "";
}
</script>

<template>
  <Title>Statistics - COVID-19 World Cases Statistics</Title>
  <div class="relative pt-10 pb-30 px-5 lg:px-30">
    <StatisticsMap
      :filteredItems="
        // If the selection is 'all' or 'world' we pass the unfiltered data since there is no country named 'world' or 'all'
        ['all', 'world'].includes(selectedOption.toLowerCase())
          ? sortedItems
          : filteredItems
      "
      class="mb-20"
    />

    <div class="mb-4 flex items-end space-x-10">
      <div class="w-fit">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Select country</label
        >
        <select
          v-model="selectedOption"
          @change="selectChangeHandler"
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          focus="ring-blue-500 border-blue-500"
          dark="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option
            v-for="(option, index) in data?.options"
            :key="index"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>

      <button
        @click.prevent="refresh({ dedupe: true })"
        class="inline-block w-full rounded-lg bg-blue-500 hover:bg-blue-600 p-2.5 text-white sm:w-auto"
      >
        Refresh data
      </button>
    </div>

    <div
      class="h-400px overflow-y-auto overflow-x-auto rounded-lg border border-gray-200"
    >
      <table class="min-w-full divide-y-2 divide-gray-200 text-sm table-auto">
        <thead class="text-left sticky top-0 bg-gray-50">
          <tr>
            <th
              v-for="{ key, label } in data?.columns"
              :key="key"
              @click="sortBy(key)"
              class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer"
            >
              {{ label }}
              <span v-if="sortColumn === key">{{
                sortDirection === "asc" ? "▲" : "▼"
              }}</span>
              <span v-else class="text-gray-400">▲▼</span>
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="item in filteredItems"
            :key="item.Country_text"
            v-if="!pending && filteredItems.length"
          >
            <td
              v-for="key in data?.itemKeys"
              :key="key"
              class="whitespace-nowrap px-4 py-2 text-gray-700"
            >
              {{
                // If the value is not a number we return the value as it is.
                isNaN(Number(item[key]))
                  ? item[key] // if the value is truthy we will check the key value in the current iteration. // And return empty string if falsy.
                  : item[key]
                  ? key === "Last Update"
                    ? // If the key is 'Last Update' we format the value following english format.
                      new Date(item[key]).toLocaleString("en", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : // Format the number following english formatting. This will use comma (',') as the thousand separator.
                      item[key].toLocaleString("en")
                  : ""
              }}
            </td>
          </tr>
          <tr v-else>
            <td class="text-center w-full h-300px" colspan="8">
              Loading data...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
