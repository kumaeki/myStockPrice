import React, { FC, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import useFetchShareInfo, { StockInfo } from './hooks/useFetchShareInfo';
import Row from './components/Row';
import DialogNewOrder from './components/DialogNewOrder';

const StockList: FC = () => {
    const [rows, setRows] = useState<StockInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                    <DialogNewOrder isOpen={open} handleClose={handleClose} />
                    <div className="Table">
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead className="TableHead">
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>種類</TableCell>
                                        <TableCell align="right">銘柄</TableCell>
                                        <TableCell align="right">通貨</TableCell>
                                        <TableCell align="right">保留数量</TableCell>
                                        <TableCell align="right">平均取得価額</TableCell>
                                        <TableCell align="right">現在値</TableCell>
                                        <TableCell align="right">購入時総額</TableCell>
                                        <TableCell align="right">時価評価額</TableCell>
                                        <TableCell align="right">実現損益</TableCell>
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

export default StockList;
