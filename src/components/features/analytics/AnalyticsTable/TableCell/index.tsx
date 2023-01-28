import { FC } from 'react'

import { Table as TableBase } from '@devexpress/dx-react-grid'
import { Table } from '@devexpress/dx-react-grid-material-ui'

import classes from './TableCell.module.scss'

interface TableRow extends Record<string, any> {
  base: string
  alias: string
}

interface TableCellProps extends Omit<TableBase.DataCellProps, 'value' | 'row'> {
  value?: any
  row?: TableRow
}

export const TableCell: FC<TableCellProps> = ({ value, row, colSpan, column, tableColumn, tableRow, children }) => (
  <Table.Cell
    className={classes.cell}
    colSpan={colSpan}
    column={column}
    row={row}
    tableColumn={tableColumn}
    tableRow={tableRow}
    value={value}
  >
    {children}
  </Table.Cell>
)
