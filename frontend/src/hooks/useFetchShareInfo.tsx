export type StockHistory = {
    code: string;
    account: string;
    number: number;
    price: number;
    purchase_date: string;
};

export type StockInfo = {
    code: string;
    name: string;
    type: string;
    curreny: string;
    number: number;
    price_mean: number;
    price_current: number;
    amount_buying: number;
    amount_current: number;
    stock_yield: number;
    history: StockHistory[];
};

const useFetchShareInfo = async (): Promise<StockInfo[]> => {
    const url = 'http://127.0.0.1:3000/fetchAllStockInfo';

    const requestOptions = {
        method: 'POST',
        headers: {
            accept: 'application/json',
        },
        body: null,
    };

    let result: StockInfo[] = [];

    await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            result = responseJson;
        });
    return result;
};

export default useFetchShareInfo;
