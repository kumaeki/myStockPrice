import { insertOneStockInfo } from './DBAccess/DBAccess';
import { StockInfoType } from './Types';

const insertStockInfo = (stockInfo: StockInfoType): void => {
    insertOneStockInfo(stockInfo);
};

export default insertStockInfo;
