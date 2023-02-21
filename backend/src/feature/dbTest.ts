import { MongoClient } from 'mongodb';

type User = {
    name: string;
    age: number;
};

const dbConnection = async () => {
    const client = await new MongoClient('mongodb://127.0.0.1:27017');
    try {
        const db = await client.db('local');
        const collection = await db.collection<User>('StockInfo');
        console.log(`1111111111111`);
        const result = await collection.insertOne({
            name: 'Alice',
            age: 19,
        });
        console.log(
            `A document was inserted with the _id: ${result.insertedId}`
        );
    } finally {
        await client.close();
    }
};

export default dbConnection;
