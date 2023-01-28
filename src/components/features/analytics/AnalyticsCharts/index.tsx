import React, { FC, MouseEvent } from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { ChartBar } from 'components/shared/ChartBar'
import { AnalyticsChartsData } from 'interfaces/api/analytics.interface'
import { calculateWidthChart, getChartOptions } from 'utils/chart'

import classes from './AnalyticsCharts.module.scss'

interface AnalyticsChartsProps {
  data: AnalyticsChartsData
  types: string[]
  onChange: (type: string) => void
  value: string
}

export const AnalyticsCharts: FC<AnalyticsChartsProps> = ({ data, types, onChange, value }) => {
  const handleChange = (event: MouseEvent<HTMLElement>, type: string) => {
    onChange(type)
  }

  return (
    <div className={classes.cont} id="bar">
      <div className={classes.group}>
        <ToggleButtonGroup color="primary" exclusive onChange={handleChange} value={value}>
          {types.map((item, index) => (
            <ToggleButton className={classes.period} disableRipple key={index} value={item}>
              {item}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <div className={classes.chart}>
        <ChartBar chartWidth={calculateWidthChart(data)} options={getChartOptions(data, value)} />
      </div>
    </div>
  )
}
