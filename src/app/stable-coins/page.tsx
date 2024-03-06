"use server"

import StableCoinsList from "@/components/StableCoinsList";
import { IListStableCoinsResponse } from "@/utilities/interfaces";

async function getData(): Promise<IListStableCoinsResponse> {
  const res = await fetch('https://stablecoins.llama.fi/stablecoins?includePrices=true')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="flex flex-col items-center">
      <StableCoinsList data={data.peggedAssets} />
    </main>
  );
}
