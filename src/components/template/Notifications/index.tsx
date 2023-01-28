import { FC, useEffect, useMemo, useState } from 'react'

import CleaningServicesIcon from '@mui/icons-material/CleaningServicesOutlined'
import NotificationsIcon from '@mui/icons-material/NotificationsNoneRounded'
import { Badge, Box, Divider, Drawer, IconButton, List, Pagination, Typography } from '@mui/material'
import { Button, ButtonSizes } from 'components/shared/Button'
import { Loader } from 'components/shared/Loader'
import { NotificationItem } from 'components/template/Notifications/NotificationItem'
import { NotificationWS, SocketMessage } from 'interfaces/api/notifications.interfaces'
import { Socket } from 'modules/ws'
import { useAppDispatch, useAppSelector } from 'store'
import {
  addNotificationFromSocket,
  getNotifications,
  readAllNotifications,
  removeAllNotifications,
  selectNotifications,
} from 'store/notifications/actions'
import { selectAuthenticated, selectProfileError, selectProfileInfo } from 'store/profile/selectors'

import classes from './Notifications.module.scss'

export const Notifications: FC = () => {
  const [page, setPage] = useState(1)
  const [opened, setOpened] = useState(false)
  const [loadingRemove, setLoadingRemove] = useState(false)

  const authenticated = useAppSelector(selectAuthenticated)
  const profileError = useAppSelector(selectProfileError)
  const profile = useAppSelector(selectProfileInfo)
  const { data: notifications, loading, ready, meta } = useAppSelector(selectNotifications)
  const unreadCount = notifications?.filter((item) => !item.read).length || 0
  const isLoading = loading || !ready

  const dispatch = useAppDispatch()
  const socket = useMemo(() => new Socket(), [])

  useEffect(() => {
    if (authenticated && !profileError) {
      dispatch(getNotifications(page))
    }
  }, [authenticated, profileError, page])

  useEffect(() => {
    if (authenticated && !profileError && profile) {
      socket.connect()

      socket.onMessage((event: MessageEvent<string>) => {
        const message: SocketMessage<NotificationWS> = JSON.parse(event.data)
        if (message.code === 'NEW_NOTIFICATION_RECEIVED') {
          const notification = message.data
          dispatch(addNotificationFromSocket({ data: notification, read: opened }))
        }
      })
    }
  }, [authenticated, profileError, profile])

  useEffect(
    () => () => {
      socket.close()
    },
    [],
  )

  const onOpen = () => {
    setOpened(true)
    dispatch(readAllNotifications())
  }

  const clearAllNotifications = () => {
    setLoadingRemove(true)
    dispatch(
      removeAllNotifications({
        onFulfilled: () => setLoadingRemove(false),
        onRejected: () => setLoadingRemove(false),
      }),
    )
  }

  return (
    <>
      <Badge badgeContent={unreadCount} classes={{ badge: classes.badge }} color="primary" sx={{ marginLeft: 'auto' }}>
        <IconButton disableRipple onClick={() => onOpen()}>
          <NotificationsIcon className={classes.icon} />
        </IconButton>
      </Badge>

      <Drawer
        anchor="right"
        classes={{ paper: classes.notifications }}
        className={classes.drawer}
        onClose={() => setOpened(false)}
        open={opened}
      >
        <Box className={classes.top}>
          <Typography sx={{ padding: '16px' }} variant="subtitle2">
            Уведомления
          </Typography>

          <Button
            className={classes.clear}
            icon={<CleaningServicesIcon />}
            loading={loadingRemove}
            onClick={clearAllNotifications}
            size={ButtonSizes.Medium}
          >
            Очистить
          </Button>
        </Box>

        <Divider />

        {isLoading && <Loader />}

        {!isLoading && !notifications?.length && (
          <Typography sx={{ margin: 'auto' }} variant="body2">
            Новых уведомлений нет
          </Typography>
        )}
        {!isLoading && !!notifications?.length && (
          <List className={classes.list}>
            {notifications.map((item) => (
              <NotificationItem item={item} key={item.id} />
            ))}
          </List>
        )}

        <Pagination
          className={classes.pagination}
          count={meta?.lastPage || 0}
          onChange={(_, newPage) => setPage(newPage)}
          page={page}
        />
      </Drawer>
    </>
  )
}
