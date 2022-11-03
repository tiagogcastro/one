import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export interface TableRowProps {
  rows: Array<{
    cell: React.ReactNode[];
  }>;
}

export function Row({ rows }: TableRowProps) {
  return (
    <React.Fragment>
      {rows.map((row, index) => (
        <TableRow key={index} sx={{ '& > *': { borderBottom: 'unset' } }}>
          {row.cell.map((cl) => (
            <TableCell key={index}>{cl}</TableCell>
          ))}
        </TableRow>
      ))}
    </React.Fragment>
  );
}
