export type StockHistory = {
    date: string;
    customerId: string;
    amount: number;
};

export type StockInfo = {
    type: string;
    name: string;
    account: string;
    shares_number: number;
    mean_price: number;
    current_price: number;
    amount: number;
    history: StockHistory[];
};

const useFetchShareInfo = async (): Promise<StockInfo[]> => {
    const url = 'http://127.0.0.1:3000/test_post';

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'user', mail: 'user@example.com' }),
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
