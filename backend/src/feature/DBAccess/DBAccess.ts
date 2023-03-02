import { MongoClient } from 'mongodb';

import { StockArrayType, StockOrderType, StockType } from '../Types';

const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'local';
const collectionName = 'StockInfo';

const insertOneInner = async (
    url: string,
    databaseName: string,
    collectionName: string,
    context: StockOrderType
) => {
    const client = new MongoClient(url);
    try {
        const db = client.db(databaseName);
        const collection = db.collection<StockOrderType>(collectionName);
        const result = await collection.insertOne(context);
        console.log(
            `A document was inserted with the _id: ${result.insertedId}`
        );
    } finally {
        await client.close();
    }
};

export const insertOne = (context: StockOrderType) => {
    insertOneInner(url, databaseName, collectionName, context);
};

const fetchAllStockInfoInner = async (
    url: string,
    databaseName: string,
    collectionName: string
) => {
    const client = new MongoClient(url);
    try {
        const result: StockArrayType = [];
        const db = client.db(databaseName);
        const collection = db.collection<StockType>(collectionName);
        const array = await collection.find().toArray();
        array.forEach((item) => result.push(item));
        return result;
    } finally {
        await client.close();
    }
};

export const fetchAllStockInfo = () => {
    return fetchAllStockInfoInner(url, databaseName, collectionName);
};
