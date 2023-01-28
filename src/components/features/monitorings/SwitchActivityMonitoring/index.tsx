import { ChangeEvent, FC, useState } from 'react'

import { FormControlLabel, Switch } from '@mui/material'
import { Monitoring } from 'interfaces/api/monitorings.interfaces'
import { useAppDispatch } from 'store'
import { updateMonitoring } from 'store/monitorings/actions'
import { mapMonitoringToSchema } from 'utils/monitoring'

import classes from './SwitchActivityMonitoring.module.scss'

interface SwitchActivityMonitoringProps {
  value?: boolean
  item?: Monitoring
}

export const SwitchActivityMonitoring: FC<SwitchActivityMonitoringProps> = ({ value, item }) => {
  const [loading, setLoading] = useState(false)
  const mappedItem = mapMonitoringToSchema(item)

  const dispatch = useAppDispatch()
  const onChange = (event: ChangeEvent, checked: boolean) => {
    if (!item) {
      return
    }
    setLoading(true)
    dispatch(
      updateMonitoring({
        monitoringId: item.id,
        form: {
          ...mappedItem,
          isActive: checked,
        },
        onFulfilled: () => {
          setLoading(false)
        },
        onRejected: () => setLoading(false),
      }),
    )
  }

  return (
    <FormControlLabel
      checked={value}
      classes={{ label: classes.label }}
      control={<Switch disabled={loading} onChange={onChange} value={value} />}
      label={value ? 'Активный' : 'Неактивный'}
    />
  )
}
