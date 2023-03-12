import { Type, Static } from '@sinclair/typebox';

export const User = Type.Object({
    name: Type.String(),
    mail: Type.Optional(Type.String({ format: 'email' })),
});
export type UserType = Static<typeof User>;

export const StockBrand = Type.Object({ code: Type.String() });
export type StockBrandType = Static<typeof StockBrand>;
export const StockBrandArray = Type.Array(StockBrand);
export type StockBrandArrayType = Static<typeof StockBrandArray>;

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

// current stock price
export const CurrentStockPrice = Type.Object({
    code: Type.String(),
    regularMarketPrice: Type.Number(),
});
export type CurrentStockPriceType = Static<typeof CurrentStockPrice>;
export const CurrentStockPriceArray = Type.Array(CurrentStockPrice);
export type CurrentStockPriceArrayType = Static<typeof CurrentStockPriceArray>;

// stock display in page
export const HistoryArray = Type.Array(StockOrder);
export const Stock = Type.Object({
    code: Type.String(),
    name: Type.String(),
    type: Type.String(),
    currency: Type.String(),
    number: Type.Number(),
    price_mean: Type.Number(),
    price_current: Type.Number(),
    amount_buying: Type.Number(),
    amount_current: Type.Number(),
    stock_yield: Type.Number(),
    history: HistoryArray,
});
export type StockType = Static<typeof Stock>;
export const StockArray = Type.Array(Stock);
export type StockArrayType = Static<typeof StockArray>;
