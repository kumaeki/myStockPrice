import { insertOne } from './DBAccess/DBAccess';
import { StockOrderType } from './Types';

const insertStockRecord = (buyingRecord: StockOrderType): void => {
    insertOne(buyingRecord);
};

export default insertStockRecord;
