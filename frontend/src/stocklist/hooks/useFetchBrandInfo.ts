export type brandInfo = {
    code: string;
    name: string;
    currency: string;
    regularMarketPrice: number;
    fullExchangeName: string;
};

const useFetchBrandInfo = async (brandCodes: string) => {
    const url = 'http://127.0.0.1:3000/fetchStockInfoFromYahoo';

    const requestOptions = {
        method: 'POST',
        headers: {
            accept: 'application/json',
        },
        body: brandCodes,
    };

    let result: brandInfo = {
        code: '',
        name: '',
        currency: '',
        regularMarketPrice: 0,
        fullExchangeName: '',
    };

    await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            result = responseJson;
        });
    return result;
};

export default useFetchBrandInfo;
