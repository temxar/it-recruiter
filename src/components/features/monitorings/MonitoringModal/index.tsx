import { FC, useEffect, useState } from 'react'
import { Controller, FormProvider } from 'react-hook-form'

import { deleteNullableInArray } from '@@@/sdd-helper'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormHelperText,
  Switch,
} from '@mui/material'
import { TextField } from '@mui/material'
import { useDeepCompareEffect, useSafeState } from 'ahooks'
import { KeywordsForm } from 'components/features/tasks/KeywordsForm'
import { SelectGrades } from 'components/inputs/SelectGrades'
import { SelectNotificationProviders } from 'components/inputs/SelectNotificationProviders'
import { SelectSources } from 'components/inputs/SelectSources'
import { SelectStacks } from 'components/inputs/SelectStacks'
import { SelectTypes } from 'components/inputs/SelectTypes'
import { SelectUser } from 'components/inputs/SelectUser'
import { SelectWorkTypes } from 'components/inputs/SelectWorkTypes'
import { Button } from 'components/shared/Button'
import { Close } from 'components/shared/Close'
import { DialogActions } from 'components/shared/DialogActions'
import { FormItem } from 'components/shared/FormItem'
import { SaveButton } from 'components/shared/SaveButton'
import { Monitoring, MonitoringFormSchema } from 'interfaces/api/monitorings.interfaces'
import { useInitForm } from 'modules/rhf'
import { monitoringSchema } from 'modules/validation'
import { useAppDispatch } from 'store'
import { createMonitoring, updateMonitoring } from 'store/monitorings/actions'
import { mapMonitoringToSchema } from 'utils/monitoring'

import classes from './MonitoringModal.module.scss'

interface StackModalProps {
  onClose?: () => void
  open?: boolean
  item?: Monitoring | null
}

export const MonitoringModal: FC<StackModalProps> = ({ onClose, open, item }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useSafeState<string | null>(null)

  const methods = useInitForm<MonitoringFormSchema>({
    resolver: yupResolver(monitoringSchema),
    defaultValues: {
      name: item?.name ?? '',
      isActive: false,
      userId: null,
      notificationProviderTypesIds: [],
      sources: [],
      stacks: [],
      grades: [],
      types: [],
      workTypes: [],
      keywords: [],
    },
  })

  const { control, handleSubmit, setValue, reset, watch } = methods
  const formParameters = watch(['sources', 'stacks', 'grades', 'types', 'workTypes', 'keywords'])

  const dispatch = useAppDispatch()

  const closeAndReset = () => {
    setLoading(false)
    onClose?.()
    setTimeout(() => {
      reset()
      setError(null)
    }, 300)
  }

  const onSubmit = (data: MonitoringFormSchema) => {
    if (
      !data.sources.length &&
      !data.stacks.length &&
      !data.grades.length &&
      !data.types.length &&
      !data.workTypes.length &&
      !data.keywords.length
    ) {
      setError('Нужно заполнить хотя бы 1 параметр мониторинга')
      return
    }
    setLoading(true)
    if (item?.id) {
      dispatch(
        updateMonitoring({
          monitoringId: item.id,
          form: data,
          onFulfilled: closeAndReset,
          onRejected: () => setLoading(false),
        }),
      )
    } else {
      dispatch(
        createMonitoring({
          form: data,
          onFulfilled: closeAndReset,
          onRejected: () => setLoading(false),
        }),
      )
    }
  }

  useEffect(() => {
    const mappedItem = mapMonitoringToSchema(item)
    setValue('name', mappedItem?.name)
    setValue('isActive', mappedItem?.isActive)
    setValue('userId', mappedItem?.userId)
    setValue('notificationProviderTypesIds', mappedItem?.notificationProviderTypesIds)
    setValue('sources', mappedItem?.sources)
    setValue('stacks', deleteNullableInArray(mappedItem?.stacks))
    setValue('grades', deleteNullableInArray(mappedItem?.grades))
    setValue('types', deleteNullableInArray(mappedItem?.types))
    setValue('workTypes', deleteNullableInArray(mappedItem?.workTypes))
    setValue('keywords', deleteNullableInArray(mappedItem?.keywords))
  }, [item])

  useDeepCompareEffect(() => {
    setError(null)
  }, [formParameters])

  return (
    <Dialog onClose={onClose} open={!!open} PaperProps={{ className: classes.wrap }}>
      <Close onClick={onClose} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{item?.id ? 'Редактирование мониторинга' : 'Добавление мониторинга'}</DialogTitle>

          <DialogContent>
            <Box className={classes.grid}>
              <Box>
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState: { error: errorInput } }) => (
                    <FormItem error={errorInput?.message} label="Название" required>
                      <TextField fullWidth size="small" {...field} />
                    </FormItem>
                  )}
                />
                <Controller
                  control={control}
                  name="isActive"
                  render={({ field, fieldState: { error: errorInput } }) => (
                    <FormItem error={errorInput?.message}>
                      <FormControlLabel
                        checked={field.value}
                        control={<Switch onChange={field.onChange} value={field.value} />}
                        label="Активный"
                      />
                    </FormItem>
                  )}
                />
                <Controller
                  control={control}
                  name="userId"
                  render={({ field, fieldState: { error: errorInput } }) => (
                    <FormItem error={errorInput?.message} label="Пользователь" required>
                      <SelectUser onChange={field.onChange} value={field.value} />
                    </FormItem>
                  )}
                />
                <Controller
                  control={control}
                  name="notificationProviderTypesIds"
                  render={({ field, fieldState: { error: errorInput } }) => (
                    <FormItem error={errorInput?.message} label="Куда отправлять уведомления" required>
                      <SelectNotificationProviders onChange={field.onChange} value={field.value} />
                    </FormItem>
                  )}
                />
                <KeywordsForm />
              </Box>

              <Divider className={classes.divider} orientation="vertical" />

              <Box>
                <Controller
                  control={control}
                  name="sources"
                  render={({ field, fieldState: { error: errorInput } }) => (
                    <FormItem error={errorInput?.message} label="Источники">
                      <SelectSources onChange={field.onChange} value={field.value} />
                    </FormItem>
                  )}
                />
                <Controller
                  control={control}
                  name="stacks"
                  render={({ field, fieldState: { error: errorInput } }) => (
                    <FormItem error={errorInput?.message} label="Стек">
                      <SelectStacks onChange={field.onChange} value={field.value} />
                    </FormItem>
                  )}
                />
                <Controller
                  control={control}
                  name="grades"
                  render={({ field, fieldState: { error: errorInput } }) => (
                    <FormItem error={errorInput?.message} label="Грейд">
                      <SelectGrades onChange={field.onChange} value={field.value} />
                    </FormItem>
                  )}
                />
                <Controller
                  control={control}
                  name="types"
                  render={({ field, fieldState: { error: errorInput } }) => (
                    <FormItem error={errorInput?.message} label="Тип">
                      <SelectTypes onChange={field.onChange} value={field.value} />
                    </FormItem>
                  )}
                />
                <Controller
                  control={control}
                  name="workTypes"
                  render={({ field, fieldState: { error: errorInput } }) => (
                    <FormItem error={errorInput?.message} label="Формат работы">
                      <SelectWorkTypes onChange={field.onChange} value={field.value} />
                    </FormItem>
                  )}
                />

                {error && (
                  <FormHelperText className={classes.error} error>
                    {error}
                  </FormHelperText>
                )}
              </Box>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose}>Отмена</Button>
            <SaveButton htmlType="submit" loading={loading}>
              Сохранить
            </SaveButton>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  )
}
