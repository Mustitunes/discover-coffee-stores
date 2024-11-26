export type MapboxType = {
    id: string;
    text: string;
    properties: {
        address: string;
    };
};

export type coffeeStoreType = {
    id: string;
    name: string;
    imgUrl: string;
    address: string;
    voting: number;
};

export type AirtableRecordType = {
    id: string;
    recordId: string;
    fields: coffeeStoreType   
};

export type ServerParamsType = {
    params: {id: string};
    searchParams: {id: string};
};