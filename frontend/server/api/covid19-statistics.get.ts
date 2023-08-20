const { backendEndpoint } = useRuntimeConfig();

export default defineEventHandler(async ({ fetch }) => {
  const data: Item[] = await (
    await fetch(`${backendEndpoint}/v1/covid19-statistics/all`)
  ).json();

  if (!data)
    return {
      covidCases: [],
      options: [],
      columns: [],
      itemKeys: [],
    };

  // Normalise the data structure and types. This will help when doing data comparison, e.g. when sorting.
  const cases = Array.isArray(data)
    ? // make a copy to avoid side effect
      data.slice(0, data.length - 1)
    : // Normalise the structure as an array when it is not
      [data];

  const covidCases = cases.map<NormalisedItem>((item) => ({
    "Active Cases_text": Number(
      item["Active Cases_text"].replace(/[^\d]/g, "")
    ),
    Country_text: item.Country_text,
    "Last Update": item["Last Update"]
      ? new Date(item["Last Update"]).getTime()
      : 0,
    "New Cases_text": Number(item["New Cases_text"].replace(/[^\d]/g, "")),
    "New Deaths_text": Number(item["New Deaths_text"].replace(/[^\d]/g, "")),
    "Total Cases_text": Number(item["Total Cases_text"].replace(/[^\d]/g, "")),
    "Total Deaths_text": Number(
      item["Total Deaths_text"].replace(/[^\d]/g, "")
    ),
    "Total Recovered_text": Number(
      item["Total Recovered_text"].replace(/[^\d]/g, "")
    ),
  }));

  const countries = ["All", ...covidCases.map((item) => item.Country_text)];

  const columnItems = (Object.keys(covidCases[0]) as ItemKey[])
    .map((key) => {
      let priority = 0;
      switch (key) {
        case "Country_text":
          priority = 0;
          break;
        case "Total Cases_text":
          priority = 1;
          break;
        case "New Cases_text":
          priority = 2;
          break;
        case "Active Cases_text":
          priority = 3;
          break;
        case "Total Deaths_text":
          priority = 4;
          break;
        case "New Deaths_text":
          priority = 5;
          break;
        case "Total Recovered_text":
          priority = 6;
          break;
        case "Last Update":
          priority = 7;
          break;
      }
      return { key, label: key.replace(/_text$/, ""), priority };
    })
    .sort((a, b) => a.priority - b.priority);

  return {
    covidCases,
    // Generate the options for select dropdown.
    options: countries,
    // Generate table column names with custom ordering.
    columns: columnItems,
    // Generate the keys of the data
    itemKeys: columnItems.map((c) => c.key),
  };
});
