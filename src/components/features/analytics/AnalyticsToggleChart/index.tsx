import { FC, MouseEvent } from 'react'

import BarChartIcon from '@mui/icons-material/BarChartOutlined'
import TableChartIcon from '@mui/icons-material/TableChartOutlined'
import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'
import { VisualizationType } from 'interfaces/common.interfaces'

import classes from './AnalyticsToggleChart.module.scss'

interface AnalyticsToggleChartProps {
  isNoData?: boolean
  visualization?: VisualizationType
  handleVisualization?: (event: MouseEvent<HTMLElement>, type: VisualizationType) => void
}

export const AnalyticsToggleChart: FC<AnalyticsToggleChartProps> = ({
  isNoData,
  visualization,
  handleVisualization,
}) => (
  <Box className={classes.wrap}>
    <ToggleButtonGroup color="primary" exclusive onChange={handleVisualization} size="small" value={visualization}>
      <ToggleButton aria-label="left aligned" disabled={isNoData} disableRipple value={VisualizationType.Table}>
        <Tooltip classes={{ popper: classes.tooltip1 }} placement="bottom-end" title="Табличное представление">
          <TableChartIcon />
        </Tooltip>
      </ToggleButton>

      <ToggleButton aria-label="centered" disabled={isNoData} disableRipple value={VisualizationType.Charts}>
        <Tooltip classes={{ popper: classes.tooltip2 }} placement="bottom-end" title="Визуализация в виде графиков">
          <BarChartIcon />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  </Box>
)
