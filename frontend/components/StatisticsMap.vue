<script lang="ts" setup>
import "svgmap/dist/svgMap.min.css";
import { SVGMapInstance, SVGMapOptions } from "~/types/svgMap";

const { $svgMap } = useNuxtApp();

const covid19MapRef = ref<HTMLDivElement>();
const svgMapInstance = ref<SVGMapInstance>();

const props = defineProps<{ filteredItems: NormalisedItem[] }>();

// Normalise data for svgMap values
const mapDataValues = computed(() => {
  const normalisedData: { [key: string]: MapValues } = {};

  if (props.filteredItems)
    props.filteredItems.forEach((item) => {
      for (const [key, value] of Object.entries(countryList)) {
        if (item.Country_text === value)
          normalisedData[key] = {
            "Active Cases_text":
              item["Active Cases_text"] || "No data available",
            Country_text: $svgMap.prototype.countries[key],
            "Last Update": new Date(item["Last Update"]).toLocaleString("en", {
              dateStyle: "medium",
              timeStyle: "short",
            }),
            "New Cases_text": item["New Cases_text"] || "No data available",
            "New Deaths_text": item["New Deaths_text"] || "No data available",
            "Total Cases_text": item["Total Cases_text"] || "No data available",
            "Total Deaths_text":
              item["Total Deaths_text"] || "No data available",
            "Total Recovered_text":
              item["Total Recovered_text"] || "No data available",
          };
      }
    });

  return normalisedData;
});

/**
 * Wrapper function to set the map.
 * @param mapDataValues Data values that will be used in the map.
 */
function setMap(mapDataValues: { [key: string]: MapValues }) {
  if (!mapDataValues) return;

  if (svgMapInstance.value) svgMapInstance.value.container.remove();

  const options: SVGMapOptions<MapValues> = {
    targetElementID: "covid19Map",
    data: {
      data: {
        Country_text: {
          name: "Country",
        },
        "Active Cases_text": {
          name: "Active Cases",
          thousandSeparator: ",",
        },
        "New Cases_text": {
          name: "New Cases",
          thousandSeparator: ",",
        },
        "New Deaths_text": {
          name: "New Deaths",
          thousandSeparator: ",",
        },
        "Total Cases_text": {
          name: "Total Cases",
          thousandSeparator: ",",
        },
        "Total Deaths_text": {
          name: "Total Deaths",
          thousandSeparator: ",",
        },
        "Total Recovered_text": {
          name: "Total Recovered",
          thousandSeparator: ",",
        },
        "Last Update": {
          name: "Last Update",
        },
      },
      applyData: "Total Cases_text",
      values: mapDataValues,
    },
    colorNoData: "#ebe8e8",
    colorMin: "#FFE5D9",
    colorMax: "#ff3c3c",
  };
  svgMapInstance.value = new $svgMap(options);
}

const stop = watch(mapDataValues, (mapDataValues) => {
  setMap(mapDataValues);
});

onMounted(() => {
  setMap(mapDataValues.value);
});

onUnmounted(() => {
  stop();
  if (svgMapInstance.value) {
    svgMapInstance.value.container.remove();
    covid19MapRef.value?.remove();
  }
});
</script>

<template>
  <div class="md:max-w-90% rounded overflow-hidden shadow-lg mx-auto">
    <div ref="covid19MapRef" id="covid19Map"></div>
  </div>
</template>
