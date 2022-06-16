import axios from "axios";
import { forEach } from "lodash";
import { useState, useEffect } from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';


export default function UserTableRow({data}) {

    return (
        <>
        { data.map(function (x,y) {
            return <TableRow>
                <TableCell component="th" scope="row">
                    {x.name}
                </TableCell>
                <TableCell  align="center">
                    {x.email}
                </TableCell>
                <TableCell  align="center">
                    <Button
                        href={"/user/edit/" + x.id}
                        size='large'>
                        Edit User
                    </Button>
                </TableCell>
            </TableRow>
        })}
        </>
    );

}