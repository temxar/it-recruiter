import { FC } from 'react'

import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui'
import { Paper } from '@mui/material'
import cx from 'clsx'
import { Analytics } from 'interfaces/api/analytics.interface'
import { Column } from 'interfaces/common.interfaces'

import { TableCell } from './TableCell'

interface AnalyticsTableProps {
  columns: Column[]
  rows: Analytics[]
}

export const AnalyticsTable: FC<AnalyticsTableProps> = ({ rows, columns }) => (
  <Paper className={cx('tableFull', 'highlightHead', 'highlightLastRow', 'highlightFirstColumn')}>
    <Grid columns={columns} rows={rows}>
      <Table cellComponent={TableCell} columnExtensions={[{ columnName: 'base', width: 180 }]} />
      <TableHeaderRow cellComponent={TableCell} />
    </Grid>
  </Paper>
)
