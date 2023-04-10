export type StockInfoAndOrder = {
    code: string;
    type: string;
    name: string;
    currency: string;

    account: string;
    number: number;
    price: number;
    purchase_date: string | undefined;
};

const userInsertOrder = async (stockInfoAndOrder: StockInfoAndOrder) => {
    const url = 'http://127.0.0.1:3000/insertStockInfoAndOrder';

    const requestOptions = {
        method: 'POST',
        headers: {
            accept: ' application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(stockInfoAndOrder),
    };
    console.log(requestOptions);
    let result = '';
    await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            result = responseJson;
        });
    return result;
};

export default userInsertOrder;
