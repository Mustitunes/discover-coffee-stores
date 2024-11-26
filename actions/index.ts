'use server'

import { updateCoffeeStore } from "@/lib/airtable"

type State = {
    id: string;
  } | undefined;

  export const upvoteAction = async (prevState: State) => {
    console.log('server action');

    // Wenn prevState undefined ist, gib undefined zurück
    if (!prevState) {
        console.log('No previous state provided');
        return undefined;
    }

    const { id } = prevState;

    const data = await updateCoffeeStore(id);
    console.log({ data });

    if (data) {
        return {
            voting: data.length > 0 ? data[0].voting : 0,
            id,
        };
    }

    return undefined; // Rückgabe, falls `data` nicht vorhanden ist
};