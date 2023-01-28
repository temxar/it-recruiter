import { FC, KeyboardEvent, MouseEvent, useState } from 'react'

import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined'
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AnalyticsToggleChart } from 'components/features/analytics/AnalyticsToggleChart'
import { Button, ButtonColors } from 'components/shared/Button'
import { AnalyticsGroupTypes, analyticsGroupTypes } from 'constants/analytics'
import { Periods, periodsTitle } from 'constants/date'
import { customErrors } from 'dictionaries/actionMessages'
import { AnalyticsDateInterval } from 'interfaces/api/analytics.interface'
import { VisualizationType } from 'interfaces/common.interfaces'

import classes from './AnalyticsFilters.module.scss'

interface AnalyticsFiltersProps {
  groupingPeriod: Periods
  params: AnalyticsDateInterval
  analyticsGroupType: AnalyticsGroupTypes
  setParams: (params: AnalyticsDateInterval) => void
  setGroupingPeriod: (period: Periods) => void
  setAnalyticsGroupType: (type: AnalyticsGroupTypes) => void
  isNoData?: boolean
  visualization?: VisualizationType
  handleVisualization?: (event: MouseEvent<HTMLElement>, type: VisualizationType) => void
}

export const AnalyticsFilters: FC<AnalyticsFiltersProps> = ({
  groupingPeriod,
  params,
  analyticsGroupType,
  setParams,
  setGroupingPeriod,
  setAnalyticsGroupType,
  isNoData,
  visualization,
  handleVisualization,
}) => {
  const [paramsInternal, setParamsInternal] = useState<AnalyticsDateInterval>(params)
  const [dateError, setDateError] = useState('')

  const buildAnalyticsInternal = () => {
    if (dateError) {
      return
    }

    if (paramsInternal.dateFrom < paramsInternal.dateTo) {
      setParams(paramsInternal)
    } else {
      setDateError(customErrors.incorrectDateInterval)
    }
  }

  const onChange = (date: Date | null, valueString?: string, isDateFrom?: boolean) => {
    if (!valueString || !date) {
      return
    }

    if (valueString.length < 10) {
      setDateError(customErrors.incorrectDateInterval)
      return
    }

    setDateError('')
    setParamsInternal((prev) => (isDateFrom ? { ...prev, dateFrom: date } : { ...prev, dateTo: date }))
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      buildAnalyticsInternal()
    }
  }

  const handleChange = (event: MouseEvent<HTMLElement>, newPeriod: Periods) => {
    setGroupingPeriod(newPeriod)
  }

  return (
    <Box className={classes.cont}>
      <Box className={classes.item}>
        <Box>
          <InputLabel className={classes.label}>Период:</InputLabel>
          <DatePicker
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            label="С"
            maxDate={params.dateTo}
            onAccept={(value: Date | null) => setParams({ ...params, dateFrom: value as Date })}
            onChange={(value: Date | null, valueString?: string) => onChange(value, valueString, true)}
            renderInput={(renderParams: any) => <TextField onKeyDown={onKeyDown} size="small" {...renderParams} />}
            value={params.dateFrom}
          />
        </Box>
        {dateError && <div className={classes.error}>{dateError}</div>}
      </Box>
      <Box className={classes.item}>
        <DatePicker
          components={{
            OpenPickerIcon: CalendarIcon,
          }}
          label="По"
          minDate={params.dateFrom}
          onAccept={(value: Date | null) => setParams({ ...params, dateTo: value as Date })}
          onChange={(value: Date | null, valueString?: string) => onChange(value, valueString)}
          renderInput={(renderParams: any) => <TextField onKeyDown={onKeyDown} size="small" {...renderParams} />}
          value={params.dateTo}
        />
        <Button className={classes.button} color={ButtonColors.Blue} onClick={buildAnalyticsInternal}>
          Применить
        </Button>
      </Box>

      <Box>
        <InputLabel className={classes.label}>Период для группировки:</InputLabel>
        <ToggleButtonGroup
          className={classes.periods}
          color="primary"
          exclusive
          onChange={handleChange}
          value={groupingPeriod}
        >
          {Object.entries(periodsTitle).map((item, index) => (
            <ToggleButton
              className={classes.period}
              disabled={groupingPeriod === item[0]}
              disableRipple
              key={index}
              value={item[0]}
            >
              {item[1]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <FormControl>
        <FormLabel className={classes.label}>Поле:</FormLabel>
        <RadioGroup
          onChange={(event) => setAnalyticsGroupType(event.target.value as AnalyticsGroupTypes)}
          row
          value={analyticsGroupType}
        >
          {Object.entries(analyticsGroupTypes).map((item, index) => (
            <FormControlLabel control={<Radio />} key={index} label={item[1]} value={item[0]} />
          ))}
        </RadioGroup>
      </FormControl>

      <AnalyticsToggleChart
        handleVisualization={handleVisualization}
        isNoData={isNoData}
        visualization={visualization}
      />
    </Box>
  )
}
