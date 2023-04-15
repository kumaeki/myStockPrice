import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import dayjs, { Dayjs } from 'dayjs';
import useFetchBranchInfo from './useFetchBranchInfo';
import userInsertOrder, { StockInfoAndOrder } from './userInsertOrder';

type useDialogNewOrderType = {
    stockBrand: string;
    stockBrandError: boolean;
    handleBrandChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

    stockBrandName: string;
    fullExchangeName: string;
    stockAccount: string;
    stockAccountError: boolean;
    handleStockAccountChange: (event: SelectChangeEvent) => void;

    stockNumber: number;
    stockNumberError: boolean;
    handleStockNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

    stockPrice: number;
    stockPriceError: boolean;
    handleStockPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

    CurrentStockPrice: number;
    currency: string;

    stockPurchaseDate: Dayjs | null;
    stockPurchaseDateError: boolean;
    handleStockPurchaseDateChange: (date: Dayjs | null) => void;

    handleClear: () => void;
    handleSearch: () => void;
    handleInsertBrand: () => void;
};

const useDialogNewOrder = (): useDialogNewOrderType => {
    const [stockBrand, setStockBrand] = useState('');
    const [stockBrandError, setStockBrandError] = useState(false);
    const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        var value = event.target.value;
        if (value.trim() === '') {
            setStockBrandError(true);
        } else {
            setStockBrandError(false);
        }
        setStockBrand(value);
    };

    const [stockBrandName, setStockBrandName] = useState('***');
    const [fullExchangeName, setFullExchangeName] = useState('***');

    const [stockAccount, setStockAccount] = useState('');
    const [stockAccountError, setStockAccountError] = useState(false);
    const handleStockAccountChange = (event: SelectChangeEvent) => {
        setStockAccountError(false);
        setStockAccount(event.target.value as string);
    };

    const [stockNumber, setStockNumber] = useState(0);
    const [stockNumberError, setStockNumberError] = useState(false);
    const handleStockNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        var value = event.target.value;
        var valueNum = event.target.valueAsNumber;
        if (value === null || value === '' || valueNum <= 0) {
            setStockNumberError(true);
        } else {
            setStockNumberError(false);
        }
        setStockNumber(event.target.valueAsNumber);
    };

    const [stockPrice, setStockPrice] = useState(0);
    const [stockPriceError, setStockPriceError] = useState(false);
    const handleStockPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        var value = event.target.value;
        var valueNum = event.target.valueAsNumber;
        if (value === null || value === '' || valueNum <= 0) {
            setStockPriceError(true);
        } else {
            setStockPriceError(false);
        }
        setStockPrice(event.target.valueAsNumber);
    };

    const [CurrentStockPrice, setCurrentStockPrice] = useState(0);
    const [currency, setCurreny] = useState('');

    const [stockPurchaseDate, setStockPurchaseDate] = React.useState<Dayjs | null>(null);
    const [stockPurchaseDateError, setStockPurchaseDateError] = useState(false);
    const handleStockPurchaseDateChange = (event: dayjs.Dayjs | null) => {
        if (event === null || !event.isValid() || event.isAfter(dayjs())) {
            setStockPurchaseDateError(true);
        } else {
            setStockPurchaseDateError(false);
        }
        setStockPurchaseDate(event);
    };

    const handleClear = () => {
        setStockBrand('');
        setStockBrandError(false);

        setStockBrandName('***');
        setFullExchangeName('***');

        setStockAccount('');
        setStockAccountError(false);

        setStockNumber(0);
        setStockNumberError(false);

        setStockPrice(0);
        setStockPriceError(false);

        setCurrentStockPrice(0);
        setCurreny('');

        setStockPurchaseDate(null);
        setStockPurchaseDateError(false);
    };

    const handleSearch = async () => {
        const branchInfo = await useFetchBranchInfo(stockBrand);
        if (branchInfo.name === undefined) {
            setStockBrandName('***');
            setFullExchangeName('***');
            setCurrentStockPrice(0);
            setCurreny('');
            setStockBrandError(true);
        } else {
            setStockBrand(stockBrand.toUpperCase());
            setStockBrandName(branchInfo.name);
            setFullExchangeName(branchInfo.fullExchangeName);
            setCurrentStockPrice(branchInfo.regularMarketPrice);
            setCurreny(branchInfo.currency);
            setStockBrandError(false);
        }
    };

    const handleInsertBrand = async () => {
        var error = false;
        if (stockBrand === null || stockBrand === '') {
            setStockBrandError(true);
            error = true;
        }

        if (stockAccount === null || stockAccount === '') {
            setStockAccountError(true);
            error = true;
        }

        if (stockNumber === null || stockNumber <= 0) {
            setStockNumberError(true);
            error = true;
        }

        if (stockPrice === null || stockPrice <= 0) {
            setStockPriceError(true);
            error = true;
        }

        if (stockPurchaseDate === null) {
            setStockPurchaseDateError(true);
            error = true;
        }

        if (error) return;

        const stockInfoAndOrder: StockInfoAndOrder = {
            code: stockBrand,
            name: stockBrandName,
            type: fullExchangeName,
            account: stockAccount,
            number: stockNumber,
            price: stockPrice,
            currency: currency,
            purchase_date: stockPurchaseDate?.format('YYYY-MM-DD'),
        };
        await userInsertOrder(stockInfoAndOrder);
        alert('株情報を登録しました。');
    };

    return {
        stockBrand,
        stockBrandError,
        handleBrandChange,
        stockBrandName,
        fullExchangeName,
        stockAccount,
        stockAccountError,
        handleStockAccountChange,
        stockNumber,
        stockNumberError,
        handleStockNumberChange,
        stockPrice,
        stockPriceError,
        handleStockPriceChange,
        CurrentStockPrice,
        currency,
        stockPurchaseDate,
        stockPurchaseDateError,
        handleStockPurchaseDateChange,
        handleClear,
        handleSearch,
        handleInsertBrand,
    };
};

export default useDialogNewOrder;
