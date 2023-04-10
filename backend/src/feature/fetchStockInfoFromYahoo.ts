import { Static, Type } from '@sinclair/typebox';
import yahooFinance from 'yahoo-finance2';

export const StockBrand = Type.String();
export type StockBrandType = Static<typeof StockBrand>;

// current stock price
export const CurrentStockInfo = Type.Object({
    code: Type.String(),
    name: Type.String(),
    currency: Type.String(),
    regularMarketPrice: Type.Number(),
    fullExchangeName: Type.String(),
});
export type CurrentStockInfoType = Static<typeof CurrentStockInfo>;
export const CurrentStockInfoArray = Type.Array(CurrentStockInfo);
export type CurrentStockInfoArrayType = Static<typeof CurrentStockInfoArray>;

const fetchStockInfoFromYahoo = async (code: StockBrandType) => {
    const dataFromYahoo = await yahooFinance.quote(code, {
        fields: ['shortName', 'currency', 'regularMarketPrice'],
    });
    console.log(dataFromYahoo);
    const result = {
        code: dataFromYahoo.symbol,
        name: dataFromYahoo.shortName || '',
        currency: dataFromYahoo.currency || '',
        regularMarketPrice: dataFromYahoo.regularMarketPrice || 0,
        fullExchangeName: dataFromYahoo.fullExchangeName || '',
    };
    return result;
};

export default fetchStockInfoFromYahoo;
