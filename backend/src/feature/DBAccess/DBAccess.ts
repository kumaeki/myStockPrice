import { MongoClient } from 'mongodb';

import {
    StockArrayType,
    StockInfoType,
    StockOrderType,
    StockType,
} from '../Types';

const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'local';
const collectionStockOrder = 't_stock_order';
const collectionStockInfo = 'm_stock_info';
const collectionVStock = 'v_stock';
const collectionType = 'm_type';
const collectionAccount = 'm_account';
const collectionCurrency = 'm_currency';

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
        console.log(
            `A document was inserted with the _id: ${result.insertedId}`
        );
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
        console.log(
            `A document was inserted with the _id: ${result.insertedId}`
        );
    } finally {
        await client.close();
    }
};

export const insertOneStockInfo = (context: StockInfoType) => {
    insertOneStockInfoInner(url, databaseName, collectionStockInfo, context);
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

const initializeDB = async () => {
    const client = new MongoClient(url);
    const db = client.db(databaseName);
    if ((await db.collection(collectionType).find().hasNext()) === false) {
        db.collection(collectionType).insertMany([
            { code: 1, name: '国内株式' },
            { code: 2, name: '米国株式' },
            { code: 3, name: '中国株式' },
            { code: 4, name: 'アジア株式' },
        ]);
        db.collection(collectionAccount).insertMany([
            { code: 1, name: '一般' },
            { code: 2, name: '特定' },
            { code: 3, name: 'NISA' },
        ]);
        db.collection(collectionCurrency).insertMany([
            { code: 1, name: 'JPY' },
            { code: 2, name: 'USD' },
            { code: 3, name: 'RMB' },
            { code: 4, name: 'HKD' },
            { code: 5, name: 'SGD' },
        ]);
    }
};

export const fetchAllStockInfo = async () => {
    // await initializeDB();
    return fetchAllStockInfoInner(url, databaseName, collectionVStock);
};
