import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StockInfo } from '../hooks/useFetchShareInfo';
import Button from '@mui/material/Button';

const Row = (props: { row: StockInfo }) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const deleteHistory = (_id: string) => {
        if (confirm('Are you sure to delete this record?')) {
        } else {
        }
    };
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.type}
                </TableCell>
                <TableCell align="right">
                    {row.code} {row.name}
                </TableCell>
                <TableCell align="right">{row.currency}</TableCell>
                <TableCell align="right">{row.number}</TableCell>
                <TableCell align="right">{row.price_mean}</TableCell>
                <TableCell align="right">{row.price_current}</TableCell>
                <TableCell align="right">{row.amount_buying}</TableCell>
                <TableCell align="right">{row.amount_current}</TableCell>
                <TableCell align="right">{row.stock_yield}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: 'lightblue' }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>口座</TableCell>
                                        <TableCell>数量</TableCell>
                                        <TableCell align="right">価額</TableCell>
                                        <TableCell align="right">購入日付</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history?.map((historyRow, index) => (
                                        <TableRow key={`${historyRow.purchase_date}-${index}`}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.account}
                                            </TableCell>
                                            <TableCell>{historyRow.number}</TableCell>
                                            <TableCell align="right">{historyRow.price}</TableCell>
                                            <TableCell align="right">{historyRow.purchase_date}</TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    variant="text"
                                                    onClick={() => {
                                                        deleteHistory(historyRow._id);
                                                    }}
                                                >
                                                    削除
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default Row;
