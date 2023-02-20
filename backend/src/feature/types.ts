import { Type, Static } from '@sinclair/typebox';

export const User = Type.Object({
    name: Type.String(),
    mail: Type.Optional(Type.String({ format: 'email' })),
});
export type UserType = Static<typeof User>;

export const Stock = Type.Object({
    type: Type.String(),
    name: Type.String(),
    account: Type.String(),
    shares_number: Type.Number(),
    mean_price: Type.Number(),
    current_price: Type.Number(),
    amount: Type.Number(),
});
export type StockType = Static<typeof Stock>;

export const StockArray = Type.Array(Stock);
export type StockArrayType = Static<typeof StockArray>;

// export type Stock = {
//     type: String;
//     name: String;
//     account: String;
//     shares_number: Number;
//     mean_price: Number;
//     current_price: Number;
//     amount: Number;
// };
// export type StockArray = Array<Stock>;
