import { AirtableRecordType, coffeeStoreType } from "@/Types";

var Airtable = require('airtable');
var base = new Airtable({ apiKey: `${process.env.AIRTABLE_TOKEN}` }).base('appZGbAgLSB856niY');


const table = base('coffee-stores');

const getMinifiedRecords = (record: Array<AirtableRecordType>) => {
    return record.map((record: AirtableRecordType) => {
        return {
            recordId: record.id,
            ...record.fields,
        }
    });
}

const findRecordsByFilter = async (id: string) => {
    const findRecords = await table
        .select({
            filterByFormula: `id="${id}"`,
        })
        .firstPage();

    return getMinifiedRecords(findRecords);
};

export const createCoffeeStore = async (coffeeStore: coffeeStoreType, id: string) => {
    //create
    try {
        if(id) {
            const { name, imgUrl, address, voting = 0 } = coffeeStore;
            const record = await findRecordsByFilter(id);
        
            if (record.length === 0) {
                const createRecords = await table.create([{
                    fields: {
                        id,
                        name,
                        imgUrl,
                        address,
                        voting,
                    }
                }])

                if(createRecords.length > 0) {
                    console.log('Created a store with id', id)
                    return getMinifiedRecords(createRecords);
                }
                
            } else {
                //return
                console.log('coffeeStore already exists!');
                return record;
            }
        } else {
            console.log('Store id is missing!');
        }
    } catch (error) {
        console.error('Error trying to create of find store!', error)
    }

}


export const updateCoffeeStore = async (id: string) => {
    //update
    try {
        if(id) {
            const records = await findRecordsByFilter(id);
        
            if (records.length !== 0) {

                const record = records[0];
                const updateVoting = record.voting + 1;

                const updateRecords = await table.update([{
                    id: record.recordId,
                    fields: {
                        voting: updateVoting,
                    }
                }])

                if(updateRecords.length > 0) {
                    console.log('Updated voting on store with id', id)
                    return getMinifiedRecords(updateRecords);
                }
                
            } else {
                //return
                console.log('coffeeStore already exists!');
                return records;
            }
        } else {
            console.log('Store id is missing!');
        }
    } catch (error) {
        console.error('Store id is missing!', error)
    }

}