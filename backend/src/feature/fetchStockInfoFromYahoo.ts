import yahooFinance from 'yahoo-finance2';
import {
    CurrentStockPriceArrayType,
    StockBrandArrayType,
    StockInfoArrayType,
} from './Types';

const fetchStockInfoFromYahoo = async (codeArray: StockBrandArrayType) => {
    const results: StockInfoArrayType = [];
    const param = codeArray.map((code) => code.code);
    const dataFromYahoo = await yahooFinance.quote(param, {
        fields: ['shortName', 'currency', 'regularMarketPrice'],
    });
    console.log(dataFromYahoo);
    dataFromYahoo.forEach((item) =>
        results.push({
            code: item.symbol,
            name: item.shortName || '',
            currency: item.currency || '',
            type: '',
        })
    );
    return results;
};

export const fetchCurrentStockPriceFromYahoo = async (
    codeArray: StockBrandArrayType
) => {
    const results: CurrentStockPriceArrayType = [];
    const param = codeArray.map((code) => code.code);
    const dataFromYahoo = await yahooFinance.quote(param, {
        fields: ['regularMarketPrice'],
    });
    dataFromYahoo.forEach((item) =>
        results.push({
            code: item.symbol,
            regularMarketPrice: item.regularMarketPrice || 0,
        })
    );
    return results;
};

export default fetchStockInfoFromYahoo;
