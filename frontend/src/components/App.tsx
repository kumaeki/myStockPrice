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
import { Dayjs } from 'dayjs';
import useFetchShareInfo, { StockInfo } from '../hooks/useFetchShareInfo';
import Box from '@mui/material/Box';
import useFetchBranchInfo from '../hooks/useFetchBranchInfo';
import Typography from '@mui/material/Typography';

const App: FC = () => {
    const [rows, setRows] = useState<StockInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [stockType, setStockType] = useState('');
    const [stockAccount, setStockAccount] = useState('');
    const [stockBrand, setStockBrand] = useState('');
    const [stockBrandName, setStockBrandName] = useState('***');
    const [stockPrice, setStockPrice] = useState(0);
    const [CurrentStockPrice, setCurrentStockPrice] = useState(0);
    const [curreny, setCurreny] = useState('');
    const [stockNumber, setStockNumber] = useState(0);
    const [stockPurchaseDate, setStockPurchaseDate] =
        React.useState<Dayjs | null>(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setStockBrandName('***');
        setStockPrice(0);
        setCurrentStockPrice(0);
        setCurreny('');
    };

    const handleSearch = async () => {
        const branchInfo = await useFetchBranchInfo(stockBrand);
        setStockBrandName(branchInfo.name);
        setCurrentStockPrice(branchInfo.regularMarketPrice);
        setCurreny(branchInfo.currency);
    };

    const handleTypeChange = (event: SelectChangeEvent) => {
        setStockType(event.target.value as string);
    };
    const handleAccountChange = (event: SelectChangeEvent) => {
        setStockAccount(event.target.value as string);
    };
    const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStockBrand(event.target.value as string);
    };
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStockPrice(event.target.valueAsNumber);
    };
    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStockNumber(event.target.valueAsNumber);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await useFetchShareInfo();
            setRows(result);
            setIsLoading(false);
        };
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
                        <DialogTitle>株購入履歴　新規入力</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                株の購入履歴を入力してください。
                            </DialogContentText>
                            <div>
                                <TextField
                                    sx={{ width: 120, marginY: 2 }}
                                    id="brand"
                                    label="銘柄"
                                    variant="standard"
                                    onChange={handleBrandChange}
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
                                                : '#fff',
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
                                    {stockBrandName}
                                </Box>
                            </div>
                            <div>
                                <FormControl sx={{ minWidth: 120, marginY: 2 }}>
                                    <InputLabel id="select-account-label">
                                        口座
                                    </InputLabel>
                                    <Select
                                        labelId="select-account-label"
                                        id="select-account"
                                        value={stockAccount}
                                        label="口座"
                                        onChange={handleAccountChange}
                                    >
                                        <MenuItem value={'一般'}>一般</MenuItem>
                                        <MenuItem value={'特定'}>特定</MenuItem>
                                        <MenuItem value={'NISA'}>NISA</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <TextField
                                    sx={{ width: 120, marginY: 2 }}
                                    margin="dense"
                                    id="number"
                                    label="数量"
                                    type="number"
                                    variant="standard"
                                    onChange={handleNumberChange}
                                />
                            </div>
                            <div>
                                <TextField
                                    sx={{ width: 120, marginBottom: 4 }}
                                    margin="dense"
                                    id="price"
                                    label="単価"
                                    type="number"
                                    variant="standard"
                                    onChange={handlePriceChange}
                                />
                                <Box
                                    sx={{
                                        display: 'block',
                                        p: 1,
                                        mb: 2,
                                        bgcolor: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? '#101010'
                                                : '#fff',
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
                                    <Typography>現在値</Typography>
                                    <Typography>
                                        {CurrentStockPrice} {curreny}
                                    </Typography>
                                </Box>
                            </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="購入日付"
                                    value={stockPurchaseDate}
                                    onChange={(newValue) => {
                                        setStockPurchaseDate(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" onClick={handleClose}>
                                Subscribe
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
