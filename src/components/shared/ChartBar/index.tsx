import { FC } from 'react'
import Chart from 'react-apexcharts'

import { ChartOptions } from 'interfaces/chart.interfaces'

interface ChartBarProps {
  options: ChartOptions
  chartWidth?: number | string
}

export const ChartBar: FC<ChartBarProps> = ({ options, chartWidth }) => (
  <Chart height="570" options={options.options} series={options.series} type="bar" width={chartWidth} />
)
