import axios from "axios";
import { forEach } from "lodash";
import { useState, useEffect } from "react";
import UserTableRow from './UserTableRow';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';


export default function UserTable() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [ident, setIdent] = useState({});
    useEffect(async () => {
        await axios.get('/get/uses').then(function (response) {
            setIdent(response.data)
            axios.get('/get/user/list/' + response.data.id).then(r => {
                setData(r.data);
                console.log(r.data);
                setLoading(false);
            });
        });
    }, []);
  
    if (isLoading) {
        return <div></div>;
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button
                        href={"/user/add"}
                        size='large'>
                        Add User
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="center">E-mail</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <UserTableRow
                                    data={data}
                                    setData={setData}
                                />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );
}