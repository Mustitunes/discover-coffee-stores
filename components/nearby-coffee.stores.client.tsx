'use client'

import React, { useEffect, useState } from 'react';
import Banner from "@/components/banner.client"
import useTrackLocation from '@/hooks/use-track-location';
import { coffeeStoreType } from '@/Types';
import Card from './card-server';
import { fetchCoffeeStores } from '@/lib/fetchCoffeeStores';

export default function NearbyCoffeeStores() {

const { handleTrackLocation, isFindingLocation, longLat, locationErrorMsg } = useTrackLocation();

const [coffeeStores, setCoffeeStores] = useState([]);

const handleOnClick = () => {
    handleTrackLocation();
};

useEffect(() => {
  async function coffeeStoresByLocation() {
    if(longLat) {
      try {
        const limit = 10;
        console.log(longLat);
        console.log(`/api/coffeeStoresByLocation?longLat=${longLat}&limit=${limit}`);
        const response = await fetch(`/api/coffeeStoresByLocation?longLat=${longLat}&limit=${limit}`);
        const coffeeStores = await response.json();
        setCoffeeStores(coffeeStores);
      } catch (error) {
        console.error('There is an error', error);
      }
    }
  };

  coffeeStoresByLocation();

},[longLat]);


return (
    <div>
      <Banner handleOnClick={handleOnClick} buttonText={isFindingLocation ? "Locating..." : "View Stores nearby"} />
      {locationErrorMsg && <p>Error: {locationErrorMsg}</p>}

      {coffeeStores.length > 0 && 
      <div className="mt-10">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
          View stores nearby
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
        </div>}
    </div>

  )
};
