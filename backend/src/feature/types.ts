import { Type, Static } from '@sinclair/typebox';

export const User = Type.Object({
    name: Type.String(),
    mail: Type.Optional(Type.String({ format: 'email' })),
});
export type UserType = Static<typeof User>;

// stock display in page
export const HistoryStockOrder = Type.Object({
    _id: Type.String(),
    code: Type.String(),
    account: Type.String(),
    number: Type.Number(),
    price: Type.Number(),
    purchase_date: Type.String({ format: 'date' }),
});
export type HistoryStockOrderType = Static<typeof HistoryStockOrder>;

export const HistoryArray = Type.Array(HistoryStockOrder);
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
