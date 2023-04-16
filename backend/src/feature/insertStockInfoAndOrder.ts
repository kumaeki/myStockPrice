import { Static, Type } from '@sinclair/typebox';
import { IsCodeExistInDB, insertOneStockInfo, insertOneStockOrder } from './DBAccess/DBAccess';
import { StockInfoType } from './insertStockInfo';

export const StockInfoAndOrder = Type.Object({
    code: Type.String(),
    type: Type.String(),
    name: Type.String(),
    currency: Type.String(),

    account: Type.String(),
    number: Type.Number(),
    price: Type.Number(),
    purchase_date: Type.String(),
});
export type StockInfoAndOrderType = Static<typeof StockInfoAndOrder>;

const insertStockInfoAndOrder = async (wholeStockInfo: StockInfoAndOrderType): Promise<void> => {
    const code = wholeStockInfo.code;
    const isCodeExist = await IsCodeExistInDB(code);
    if (!isCodeExist) {
        const stockInfo: StockInfoType = {
            code: wholeStockInfo.code,
            type: wholeStockInfo.type,
            name: wholeStockInfo.name,
            currency: wholeStockInfo.currency,
        };
        insertOneStockInfo(stockInfo);
    }

    const stockOrder = {
        code: wholeStockInfo.code,
        account: wholeStockInfo.account,
        number: wholeStockInfo.number,
        price: wholeStockInfo.price,
        purchase_date: wholeStockInfo.purchase_date,
    };
    insertOneStockOrder(stockOrder);
};

export default insertStockInfoAndOrder;
