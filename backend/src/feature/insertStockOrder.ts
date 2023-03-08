import { insertOneStockOrder } from './DBAccess/DBAccess';
import { StockOrderType } from './Types';

const insertStockOrder = (buyingRecord: StockOrderType): void => {
    insertOneStockOrder(buyingRecord);
};

export default insertStockOrder;
