import { FC } from 'react'
import { Controller, SubmitHandler } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { FormHelperText, TextField } from '@mui/material'
import { Button, ButtonColors } from 'components/shared/Button'
import { FormItem } from 'components/shared/FormItem'
import { LoginData } from 'interfaces/api/auth.interfaces'
import { useInitForm } from 'modules/rhf'
import { loginSchema } from 'modules/validation'
import { useAppDispatch, useAppSelector } from 'store'
import { login } from 'store/profile/actions'
import { selectAuthError, selectProfileLoading } from 'store/profile/selectors'

import classes from './LoginForm.module.scss'

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch()

  const loading = useAppSelector(selectProfileLoading)
  const authError = useAppSelector(selectAuthError)

  const { control, handleSubmit } = useInitForm<LoginData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: 'demo@###.cc',
      password: '8WsTM21zzX',
    },
  })

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    dispatch(login(data))
  }

  return (
    <div className={classes.wrap}>
      <div className={classes.block}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { error: errorInput } }) => (
              <FormItem error={errorInput?.message} label="Email">
                <TextField fullWidth size="small" {...field} type="email" />
              </FormItem>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState: { error: errorInput } }) => (
              <FormItem error={errorInput?.message} label="Пароль">
                <TextField fullWidth size="small" {...field} type="password" />
              </FormItem>
            )}
          />

          <Button className={classes.button} color={ButtonColors.Blue} fullWidth htmlType="submit" loading={loading}>
            Войти
          </Button>

          {authError && (
            <FormHelperText className={classes.error} error>
              {authError}
            </FormHelperText>
          )}
        </form>
      </div>
    </div>
  )
}
