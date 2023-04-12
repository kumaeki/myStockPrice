import { fetchAllStockInfo } from './DBAccess/DBAccess';
import fetchStockInfoFromYahoo from './fetchStockInfoFromYahoo';

const fetchStockInfo = async () => {
    const stockInfoFromDB = await fetchAllStockInfo();
    const stockInfoPromises = stockInfoFromDB.map((stock) => {
        return fetchStockInfoFromYahoo(stock.code);
    });

    const stockInfoFromYahoo = await Promise.all(stockInfoPromises);
    return stockInfoFromDB.map((stock, index) => ({
        ...stock,
        price_current: stockInfoFromYahoo[index].regularMarketPrice,
        amount_current: stock.number * stockInfoFromYahoo[index].regularMarketPrice,
        stock_yield: stock.number * stockInfoFromYahoo[index].regularMarketPrice - stock.amount_buying,
    }));
};

export default fetchStockInfo;
