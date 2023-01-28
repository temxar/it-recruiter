import { FC, MouseEvent, useEffect, useState } from 'react'

import { Box } from '@mui/material'
import { Loader } from 'components/shared/Loader'
import { AnalyticsGroupTypes } from 'constants/analytics'
import { Periods } from 'constants/date'
import { AnalyticsDateInterval } from 'interfaces/api/analytics.interface'
import { VisualizationType } from 'interfaces/common.interfaces'
import { useAppDispatch, useAppSelector } from 'store'
import { getAnalytics, selectAnalytics } from 'store/analytics/actions'
import { selectAnalyticsData, selectChartsTypes } from 'store/analytics/selectors'

import classes from './Analytics.module.scss'
import { AnalyticsCharts } from './AnalyticsCharts'
import { AnalyticsFilters } from './AnalyticsFilters'
import { AnalyticsTable } from './AnalyticsTable'

export const Analytics: FC = () => {
  const [visualization, setVisualization] = useState(VisualizationType.Table)
  const [groupingPeriod, setGroupingPeriod] = useState(Periods.Month)
  const [analyticsGroupType, setAnalyticsGroupType] = useState(AnalyticsGroupTypes.Stack)
  const [analyticsType, setAnalyticsType] = useState('')
  const [params, setParams] = useState<AnalyticsDateInterval>({
    dateFrom: new Date(new Date().getFullYear(), 0, 1),
    dateTo: new Date(),
  })

  const { data: analytics, loading } = useAppSelector(selectAnalytics)
  const chartsTypes = useAppSelector(selectChartsTypes)
  const analyticsData = useAppSelector(selectAnalyticsData)

  const dispatch = useAppDispatch()

  const buildAnalytics = () => {
    dispatch(
      getAnalytics({
        period: groupingPeriod,
        timeRange: `${Math.floor(params.dateFrom.getTime() / 1000)},${Math.floor(params.dateTo.getTime() / 1000)}`,
        parameters: analyticsGroupType,
      }),
    )
  }

  const handleVisualization = (event: MouseEvent<HTMLElement>, type: VisualizationType) => {
    setVisualization(type)
  }

  useEffect(() => {
    buildAnalytics()
    setAnalyticsType('')
  }, [groupingPeriod, params, analyticsGroupType])

  return (
    <Box className={classes.cont}>
      <AnalyticsFilters
        analyticsGroupType={analyticsGroupType}
        groupingPeriod={groupingPeriod}
        handleVisualization={handleVisualization}
        isNoData={analytics?.length === 0}
        params={params}
        setAnalyticsGroupType={setAnalyticsGroupType}
        setGroupingPeriod={setGroupingPeriod}
        setParams={setParams}
        visualization={visualization}
      />

      {loading && <Loader />}

      {!loading && analytics && (
        <>
          {visualization === VisualizationType.Table && analyticsData && (
            <AnalyticsTable columns={analyticsData.analyticsColumns} rows={analyticsData.analyticsRows} />
          )}
          {visualization === VisualizationType.Charts && analyticsData && chartsTypes && (
            <AnalyticsCharts
              data={chartsTypes}
              onChange={setAnalyticsType}
              types={analyticsData.chartsMap}
              value={analyticsType || analyticsData.chartsMap[0]}
            />
          )}
        </>
      )}
    </Box>
  )
}
