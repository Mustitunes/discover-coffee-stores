import Banner from "@/components/banner.client"
import Card from "@/components/card-server";
import { fetchCoffeeStores } from "../lib/fetchCoffeeStores";
import { coffeeStoreType } from "../Types";
import Image from "next/image";
import { createApi } from 'unsplash-js';
import NearbyCoffeeStores from "@/components/nearby-coffee.stores.client";



async function getData() {

  if(!process.env.MAPBOX_API_TOKEN || !process.env.UNSPLASH_ACESS_KEY || !process.env.AIRTABLE_TOKEN) {
    throw new Error('One of the Api keys is not configured!');
  }
  
  //MapboxApiFetch
  const osnaLongLat = "8.047226311740104%2C52.273543912983"
  return await fetchCoffeeStores(osnaLongLat, 6);
}

export type UnsplashImage = {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

export default async function Home() {
  const coffeeStores = await getData();

  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <NearbyCoffeeStores />
        <div className="mt-10">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Osnabrück Stores
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
            {coffeeStores.map((coffeeStores: coffeeStoreType, idx: number) => (
              <Card
                key={`${coffeeStores.name}-${coffeeStores.id}`}
                name={`${coffeeStores.name}`}
                imgUrl={`${coffeeStores.imgUrl}`}
                href={`/coffee-store/${coffeeStores.id}`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
