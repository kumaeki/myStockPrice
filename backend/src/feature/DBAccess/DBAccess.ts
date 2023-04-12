import { MongoClient } from 'mongodb';
import { StockInfoType } from '../insertStockInfo';
import { StockOrderType } from '../insertStockOrder';

import { StockArrayType, StockType } from '../Types';

const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'local';
const collectionStockOrder = 't_stock_order';
const collectionStockInfo = 'm_stock_info';
const collectionVStock = 'v_stock';

const insertOneStockOrderInner = async (
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
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
};

export const insertOneStockOrder = (context: StockOrderType) => {
    insertOneStockOrderInner(url, databaseName, collectionStockOrder, context);
};

const insertOneStockInfoInner = async (
    url: string,
    databaseName: string,
    collectionName: string,
    context: StockInfoType
) => {
    const client = new MongoClient(url);
    try {
        const db = client.db(databaseName);
        const collection = db.collection<StockInfoType>(collectionName);
        const result = await collection.insertOne(context);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
};

export const insertOneStockInfo = (context: StockInfoType) => {
    insertOneStockInfoInner(url, databaseName, collectionStockInfo, context);
};

const fetchAllStockInfoInner = async (url: string, databaseName: string, collectionName: string) => {
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

export const fetchAllStockInfo = async () => {
    return fetchAllStockInfoInner(url, databaseName, collectionVStock);
};

const IsCodeExistInDBInner = async (url: string, databaseName: string, collectionName: string, code: string) => {
    const client = new MongoClient(url);
    try {
        const db = client.db(databaseName);
        const collection = db.collection<StockInfoType>(collectionName);
        const filter = {
            code: code,
        };
        const array = await collection.find(filter).toArray();
        return array.length > 0;
    } finally {
        await client.close();
    }
};

export const IsCodeExistInDB = async (code: string): Promise<boolean> => {
    return await IsCodeExistInDBInner(url, databaseName, collectionVStock, code);
};
