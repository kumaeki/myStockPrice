import { Stock, StockArray, StockArrayType, StockType } from './Types';

const fetchStockInfo = (): StockArrayType => {
    return [
        createData(
            '国内株式',
            '9201 日本航空',
            '特定',
            100,
            2000,
            2678,
            267800
        ),
        createData(
            '国内株式',
            '9202 ＡＮＡホールディングス',
            '特定',
            300,
            2270.25,
            2799.5,
            839850
        ),
        createData(
            '国内株式',
            '9202 ＡＮＡホールディングス',
            'NISA',
            100,
            2408.0,
            2799.5,
            279950
        ),
        createData(
            '国内株式',
            '9434 ソフトバンク',
            '特定',
            100,
            2000,
            2678,
            267800
        ),
        createData(
            '米国株式',
            'AAPL アップル',
            '特定',
            10,
            108.534,
            126.04,
            168427
        ),
        createData(
            '米国株式',
            'TSLA テスラ',
            '特定',
            10,
            185.915,
            112.71,
            150614
        ),
    ];
};

const createData = (
    type: string,
    name: string,
    account: string,
    shares_number: number,
    mean_price: number,
    current_price: number,
    amount: number
): StockType => {
    return {
        type,
        name,
        account,
        shares_number,
        mean_price,
        current_price,
        amount,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2023-01-05',
                customerId: '11091700',
                amount: 1,
            },
        ],
    };
};

export default fetchStockInfo;
