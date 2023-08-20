interface Item {
  "Active Cases_text": string;
  Country_text: string;
  "Last Update"?: string;
  "New Cases_text": string;
  "New Deaths_text": string;
  "Total Cases_text": string;
  "Total Deaths_text": string;
  "Total Recovered_text": string;
}

interface NormalisedItem {
  "Active Cases_text": number;
  Country_text: string;
  "Last Update": number;
  "New Cases_text": number;
  "New Deaths_text": number;
  "Total Cases_text": number;
  "Total Deaths_text": number;
  "Total Recovered_text": number;
}

interface MapValues {
  "Active Cases_text": number | string;
  Country_text: string;
  "Last Update": string;
  "New Cases_text": number | string;
  "New Deaths_text": number | string;
  "Total Cases_text": number | string;
  "Total Deaths_text": number | string;
  "Total Recovered_text": number | string;
}

type ItemKey =
  | "Active Cases_text"
  | "Country_text"
  | "Last Update"
  | "New Cases_text"
  | "New Deaths_text"
  | "Total Cases_text"
  | "Total Deaths_text"
  | "Total Recovered_text";

interface TableColumn {
  key: ItemKey;
  label: string;
  priority: number;
}
