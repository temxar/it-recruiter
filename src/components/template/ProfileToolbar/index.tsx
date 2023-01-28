import { FC, useState } from 'react'

import LogoutIcon from '@mui/icons-material/LogoutTwoTone'
import { Box, IconButton, Typography } from '@mui/material'
import { ReactComponent as Logo } from 'assets/images/logo.svg'
import cx from 'clsx'
import { Loader } from 'components/shared/Loader'
import { Notifications } from 'components/template/Notifications'
import { useLogout } from 'hooks/useLogout'
import { useAppSelector } from 'store'
import { selectProfileInfo } from 'store/profile/selectors'
import { roleToRus } from 'utils/roleToRus'

import classes from './ProfileToolbar.module.scss'

interface ProfileToolbarProps {
  loading?: boolean
}

export const ProfileToolbar: FC<ProfileToolbarProps> = ({ loading }) => {
  const [logoutInProgress, setLogoutInProgress] = useState<boolean>(false)
  const profile = useAppSelector(selectProfileInfo)

  const { logout } = useLogout()

  const onLogout = () => {
    setLogoutInProgress(true)
    logout()
  }

  return (
    <div className={classes.wrap}>
      {logoutInProgress && (
        <Box className={classes.logout}>
          <Logo className={classes.logo} />
          <div className={classes.content}>
            <Loader />
          </div>
        </Box>
      )}

      {!loading && profile && (
        <div className={cx(classes.right, 'open')}>
          <Notifications />
          <Box className={classes.profile}>
            <div className={classes.user}>
              <Typography variant="subtitle1">{profile?.email}</Typography>
              <div className={classes.role}>{roleToRus(profile?.role)}</div>
            </div>
            <IconButton className={classes.logoutButton} disableRipple onClick={onLogout}>
              <LogoutIcon className={classes.logoutIcon} />
            </IconButton>
          </Box>
        </div>
      )}
    </div>
  )
}
