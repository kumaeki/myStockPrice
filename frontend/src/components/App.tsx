import React, { FC, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from './Row';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import useFetchShareInfo, { StockInfo } from '../hooks/useFetchShareInfo';
import Box from '@mui/material/Box';
import useFetchBranchInfo from '../hooks/useFetchBranchInfo';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import userInsertOrder, { StockInfoAndOrder } from '../hooks/userInsertOrder';

const App: FC = () => {
    const [rows, setRows] = useState<StockInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [stockType, setStockType] = useState('');

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
    const handleStockNumberChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
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
    const handleStockPriceChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
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

    const [stockPurchaseDate, setStockPurchaseDate] =
        React.useState<Dayjs | null>(null);
    const [stockPurchaseDateError, setStockPurchaseDateError] = useState(false);
    const handleStockPurchaseDateChange = (event: dayjs.Dayjs | null) => {
        if (event === null || !event.isValid() || event.isAfter(dayjs())) {
            setStockPurchaseDateError(true);
        } else {
            setStockPurchaseDateError(false);
        }
        setStockPurchaseDate(event);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
        console.log(stockInfoAndOrder);
        await userInsertOrder(stockInfoAndOrder);
        alert('株情報を登録しました。');
        fetchData();
    };

    const handleTypeChange = (event: SelectChangeEvent) => {
        setStockType(event.target.value as string);
    };

    const fetchData = async () => {
        const result = await useFetchShareInfo();
        setRows(result);
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        株情報　新規入力
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        sx={{ margin: 'auto' }}
                    >
                        <DialogTitle>株情報　新規入力</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                株の購入履歴を入力してください。
                            </DialogContentText>
                            <div>
                                <TextField
                                    sx={{ width: 160, marginY: 2 }}
                                    id="brand"
                                    label="銘柄"
                                    variant="standard"
                                    onChange={handleBrandChange}
                                    error={stockBrandError}
                                    value={stockBrand}
                                    helperText={
                                        stockBrandError
                                            ? '銘柄を入力してください。'
                                            : ''
                                    }
                                    onBlur={handleSearch}
                                />
                                <Button
                                    sx={{ marginLeft: 2, marginTop: 4 }}
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                            </div>
                            <div>
                                <Box
                                    component="span"
                                    sx={{
                                        display: 'block',
                                        p: 1,
                                        bgcolor: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? '#101010'
                                                : '#EEE',
                                        color: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? 'grey.300'
                                                : 'grey.800',
                                        border: '1px solid',
                                        borderColor: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? 'grey.800'
                                                : 'grey.300',
                                        borderRadius: 1,
                                    }}
                                >
                                    <Typography>
                                        市場：{fullExchangeName}
                                    </Typography>
                                    <Typography>
                                        名称：{stockBrandName}
                                    </Typography>
                                </Box>
                            </div>
                            <div>
                                <FormControl
                                    sx={{ minWidth: 120, marginY: 2 }}
                                    error={stockAccountError}
                                >
                                    <InputLabel id="select-account-label">
                                        口座
                                    </InputLabel>
                                    <Select
                                        labelId="select-account-label"
                                        id="select-account"
                                        value={stockAccount}
                                        label="口座"
                                        onChange={handleStockAccountChange}
                                    >
                                        <MenuItem value={'一般'}>一般</MenuItem>
                                        <MenuItem value={'特定'}>特定</MenuItem>
                                        <MenuItem value={'NISA'}>NISA</MenuItem>
                                    </Select>

                                    {stockAccountError ? (
                                        <FormHelperText>
                                            口座を選択してください。
                                        </FormHelperText>
                                    ) : (
                                        ''
                                    )}
                                </FormControl>
                            </div>
                            <div>
                                <TextField
                                    sx={{ width: 160, marginY: 2 }}
                                    margin="dense"
                                    id="number"
                                    label="数量"
                                    type="number"
                                    error={stockNumberError}
                                    value={stockNumber}
                                    helperText={
                                        stockNumberError
                                            ? '数量を入力してください。'
                                            : ''
                                    }
                                    variant="standard"
                                    onChange={handleStockNumberChange}
                                />
                            </div>
                            <div>
                                <TextField
                                    sx={{ width: 160, marginBottom: 4 }}
                                    margin="dense"
                                    id="price"
                                    label="単価"
                                    type="number"
                                    value={stockPrice}
                                    error={stockPriceError}
                                    helperText={
                                        stockPriceError
                                            ? '単価を入力してください。'
                                            : ''
                                    }
                                    variant="standard"
                                    onChange={handleStockPriceChange}
                                />
                                <Box
                                    sx={{
                                        display: 'block',
                                        p: 1,
                                        mb: 2,
                                        bgcolor: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? '#101010'
                                                : '#EEE',
                                        color: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? 'grey.300'
                                                : 'grey.800',
                                        border: '1px solid',
                                        borderColor: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? 'grey.800'
                                                : 'grey.300',
                                        borderRadius: 1,
                                    }}
                                >
                                    <Typography>
                                        現在値：{CurrentStockPrice} {currency}
                                    </Typography>
                                </Box>
                            </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="購入日付"
                                    value={stockPurchaseDate}
                                    onChange={(e) => {
                                        handleStockPurchaseDateChange(e);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={stockPurchaseDateError}
                                            helperText={
                                                stockPurchaseDateError
                                                    ? '今日、または過去の日付を入力してください。'
                                                    : null
                                            }
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="contained" onClick={handleClear}>
                                Clear
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleInsertBrand}
                            >
                                追加
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <div className="Table">
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead className="TableHead">
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>種類</TableCell>
                                        <TableCell align="right">
                                            銘柄
                                        </TableCell>
                                        <TableCell align="right">
                                            通貨
                                        </TableCell>
                                        <TableCell align="right">
                                            保留数量
                                        </TableCell>
                                        <TableCell align="right">
                                            平均取得価額
                                        </TableCell>
                                        <TableCell align="right">
                                            現在値
                                        </TableCell>
                                        <TableCell align="right">
                                            購入時総額
                                        </TableCell>
                                        <TableCell align="right">
                                            時価評価額
                                        </TableCell>
                                        <TableCell align="right">
                                            実現損益
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className="TableBody">
                                    {rows.map((row) => (
                                        <Row key={row.name} row={row} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
