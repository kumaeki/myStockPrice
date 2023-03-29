import { Type, Static } from '@sinclair/typebox';
import { StockOrder } from './insertStockOrder';

export const User = Type.Object({
    name: Type.String(),
    mail: Type.Optional(Type.String({ format: 'email' })),
});
export type UserType = Static<typeof User>;

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
