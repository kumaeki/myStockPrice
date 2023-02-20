import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './App.css';
import UseFetchSharesInfo from '../hooks/UseFetchSharesInfo';
import Row from './Row';

const rows = UseFetchSharesInfo();

function App() {
    return (
        <div className="Table">
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead className="TableHead">
                        <TableRow>
                            <TableCell />
                            <TableCell>種類</TableCell>
                            <TableCell align="right">銘柄</TableCell>
                            <TableCell align="right">口座</TableCell>
                            <TableCell align="right">保留数量</TableCell>
                            <TableCell align="right">平均取得価額</TableCell>
                            <TableCell align="right">現在値</TableCell>
                            <TableCell align="right">時価評価額</TableCell>
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
    );
}

export default App;
