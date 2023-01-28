import { FC, useState } from 'react'

import CircleIcon from '@mui/icons-material/Circle'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Divider, IconButton, ListItem, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { Notification } from 'interfaces/api/notifications.interfaces'
import { useAppDispatch } from 'store'
import { removeNotification } from 'store/notifications/actions'

import classes from './Notifications.module.scss'

interface NotificationItemProps {
  item: Notification
}

export const NotificationItem: FC<NotificationItemProps> = ({ item }) => {
  const [loadingRemove, setLoadingRemove] = useState(false)

  const dispatch = useAppDispatch()

  const onRemoveNotification = (notificationId: number) => {
    setLoadingRemove(true)
    dispatch(
      removeNotification({
        notificationId,
        onFulfilled: () => setLoadingRemove(false),
        onRejected: () => setLoadingRemove(false),
      }),
    )
  }

  return (
    <>
      <ListItem className={classes.item}>
        <Box className={classes.itemCont}>
          <CircleIcon className={classes.circle} color={item.type} />
          <Typography className={classes.message} variant="subtitle2">
            {item.message}
          </Typography>
        </Box>

        <Typography sx={{ marginLeft: '28px' }} variant="caption">
          {item.datetime}
        </Typography>

        <IconButton className={classes.delete} disableRipple onClick={() => onRemoveNotification(item.id)}>
          {loadingRemove ? (
            <div className={classes.loading}>
              <CircularProgress size="12px" />
            </div>
          ) : (
            <CloseIcon sx={{ fontSize: '14px' }} />
          )}
        </IconButton>
      </ListItem>

      <Divider />
    </>
  )
}
