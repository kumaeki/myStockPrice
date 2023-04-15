import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import useDialogNewOrder from '../hooks/useDialogNewOrder';

type DialogNewOrderProps = {
    isOpen: boolean;
    handleClose: () => void;
};

const DialogNewOrder: FC<DialogNewOrderProps> = ({ isOpen, handleClose }) => {
    const {
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
    } = useDialogNewOrder();

    return (
        <Dialog open={isOpen} onClose={handleClose} sx={{ margin: 'auto' }}>
            <DialogTitle>株情報　新規入力</DialogTitle>
            <DialogContent>
                <DialogContentText>株の購入履歴を入力してください。</DialogContentText>
                <div>
                    <TextField
                        sx={{ width: 160, marginY: 2 }}
                        id="brand"
                        label="銘柄"
                        variant="standard"
                        onChange={handleBrandChange}
                        error={stockBrandError}
                        value={stockBrand}
                        helperText={stockBrandError ? '銘柄を入力してください。' : ''}
                        onBlur={handleSearch}
                    />
                    <Button sx={{ marginLeft: 2, marginTop: 4 }} onClick={handleSearch}>
                        Search
                    </Button>
                </div>
                <div>
                    <Box
                        component="span"
                        sx={{
                            display: 'block',
                            p: 1,
                            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#EEE'),
                            color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                            border: '1px solid',
                            borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
                            borderRadius: 1,
                        }}
                    >
                        <Typography>市場：{fullExchangeName}</Typography>
                        <Typography>名称：{stockBrandName}</Typography>
                    </Box>
                </div>
                <div>
                    <FormControl sx={{ minWidth: 120, marginY: 2 }} error={stockAccountError}>
                        <InputLabel id="select-account-label">口座</InputLabel>
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

                        {stockAccountError ? <FormHelperText>口座を選択してください。</FormHelperText> : ''}
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
                        helperText={stockNumberError ? '数量を入力してください。' : ''}
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
                        helperText={stockPriceError ? '単価を入力してください。' : ''}
                        variant="standard"
                        onChange={handleStockPriceChange}
                    />
                    <Box
                        sx={{
                            display: 'block',
                            p: 1,
                            mb: 2,
                            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#EEE'),
                            color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                            border: '1px solid',
                            borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
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
                                    stockPurchaseDateError ? '今日、または過去の日付を入力してください。' : null
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
                <Button variant="contained" onClick={handleInsertBrand}>
                    追加
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogNewOrder;
