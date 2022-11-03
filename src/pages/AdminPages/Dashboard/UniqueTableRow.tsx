import { Box, Collapse, IconButton, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';

import { nouApi, UserData } from '../../../services';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export interface UniqueTableRowProps {
  user: UserData;
}

export function UniqueTableRow({ user }: UniqueTableRowProps) {
  const [open, setOpen] = useState(false);

  console.log(user);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell scope="row">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <IoArrowUp /> : <IoArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.lastname}</TableCell>
        <TableCell>{user.username}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box marginBottom={3}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography fontSize="1.2rem" fontWeight="bold">
                        Cargo
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontSize="1.2rem" fontWeight="bold">
                        Empresas
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>
                    {user.UserRole.map(({ role }) => (
                      <TableRow key={role.id}>
                        <TableCell>{role.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableCell>
                  <TableCell>
                    {user.Company &&
                      user.Company.map((company) => (
                        <TableRow key={company.id}>
                          <TableCell key={company.id}>{company.name}</TableCell>
                        </TableRow>
                      ))}
                  </TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
