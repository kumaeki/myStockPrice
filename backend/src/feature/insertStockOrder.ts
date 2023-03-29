import { Static, Type } from '@sinclair/typebox';
import { insertOneStockOrder } from './DBAccess/DBAccess';

// stock order
export const StockOrder = Type.Object({
    code: Type.String(),
    account: Type.String(),
    number: Type.Number(),
    price: Type.Number(),
    purchase_date: Type.String({ format: 'date' }),
});
export type StockOrderType = Static<typeof StockOrder>;
export const StockOrderArray = Type.Array(StockOrder);
export type StockOrderArrayType = Static<typeof StockOrderArray>;

const insertStockOrder = (buyingRecord: StockOrderType): void => {
    insertOneStockOrder(buyingRecord);
};

export default insertStockOrder;
