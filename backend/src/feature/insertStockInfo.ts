import { Static, Type } from '@sinclair/typebox';
import { insertOneStockInfo } from './DBAccess/DBAccess';

// stock Info
export const StockInfo = Type.Object({
    code: Type.String(),
    type: Type.String(),
    name: Type.String(),
    currency: Type.String(),
});
export type StockInfoType = Static<typeof StockInfo>;
export const StockInfoArray = Type.Array(StockInfo);
export type StockInfoArrayType = Static<typeof StockInfoArray>;

const insertStockInfo = (stockInfo: StockInfoType): void => {
    insertOneStockInfo(stockInfo);
};

export default insertStockInfo;
