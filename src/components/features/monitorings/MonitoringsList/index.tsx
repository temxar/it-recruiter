import { FC, MouseEvent, useEffect, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'

import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/EditOutlined'
import MenuIcon from '@mui/icons-material/MenuOutlined'
import { Box, IconButton, MenuItem, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { useSafeState } from 'ahooks'
import cx from 'clsx'
import { MonitoringModal } from 'components/features/monitorings/MonitoringModal'
import { RemoveMonitoringModal } from 'components/features/monitorings/RemoveMonitoringModal'
import { AddButton } from 'components/shared/AddButton'
import { ContextMenu } from 'components/shared/ContextMenu'
import { NoData } from 'components/shared/NoData'
import { TableCell } from 'components/shared/TableCell'
import { monitoringsColumns } from 'constants/monitorings'
import { Routes } from 'constants/routes'
import { useIdUrl } from 'hooks/useIdUrl'
import { useModal } from 'hooks/useModal'
import { Monitoring } from 'interfaces/api/monitorings.interfaces'
import { Roles } from 'interfaces/api/roles.interfaces'
import { useAppDispatch, useAppSelector } from 'store'
import { getGrades, selectGrades } from 'store/grades/actions'
import {
  getMonitoringParameters,
  getMonitorings,
  getNotificationProviders,
  removeMonitoring,
  selectMonitorings,
} from 'store/monitorings/actions'
import { selectProfileInfo } from 'store/profile/selectors'
import { getResourceTypes, selectResourceTypes } from 'store/resourceTypes/actions'
import { getStacks, selectStacks } from 'store/stacks/actions'
import { getUsers } from 'store/users/actions'
import { getWorkTypes, selectWorkTypes } from 'store/workTypes/actions'

import classes from './MonitoringsList.module.scss'

export const MonitoringsList: FC = () => {
  const [menuContainer, setMenuContainer] = useState<HTMLElement | null>(null)
  const openedMenu = !!menuContainer

  const [loadingRemove, setLoadingRemove] = useState(false)
  const [activeItem, setActiveItem] = useSafeState<Monitoring | null>(null)
  const { id: currentId } = useIdUrl()

  const { data: monitorings, loading, ready } = useAppSelector(selectMonitorings)
  const { ready: readyGrades } = useAppSelector(selectGrades)
  const { ready: readyStacks } = useAppSelector(selectStacks)
  const { ready: readyResourceTypes } = useAppSelector(selectResourceTypes)
  const { ready: readyWorkTypes } = useAppSelector(selectWorkTypes)
  const profile = useAppSelector(selectProfileInfo)

  const isLoading = loading || !ready
  const items = (isLoading ? new Array(10).fill(0) : monitorings || []) as Monitoring[]

  const [openedModal, openModal, closeModal] = useModal()
  const [openedRemoveModal, openRemoveModal, closeRemoveModal] = useModal()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const openMenu = (event: MouseEvent<HTMLElement>, item: Monitoring) => {
    setMenuContainer(event.currentTarget)
    setActiveItem(item)
  }

  const closeMenu = () => {
    setMenuContainer(null)
    setTimeout(() => setActiveItem(null), 300)
  }

  const onOpenEdit = () => {
    if (activeItem?.id) {
      openModal()
      setMenuContainer(null)
      const path = generatePath(Routes.Monitoring, { id: activeItem.id.toString() })
      navigate(path)
    }
  }

  const onOpenCreate = () => {
    openModal()
    setActiveItem(null)
  }

  const onCloseEdit = () => {
    closeModal()
    navigate(Routes.Monitorings)
  }

  const onOpenRemove = () => {
    openRemoveModal()
    setMenuContainer(null)
  }

  const onRemoveMonitoring = (monitoringId?: number) => {
    if (monitoringId) {
      setLoadingRemove(true)
      closeMenu()
      dispatch(
        removeMonitoring({
          monitoringId,
          onFulfilled: () => {
            closeRemoveModal()
            setLoadingRemove(false)
          },
          onRejected: () => setLoadingRemove(false),
        }),
      )
    }
  }

  useEffect(() => {
    if (ready && items.length && currentId) {
      setActiveItem(items.find((item) => item.id === currentId) ?? null)
      openModal()
    }
  }, [ready, currentId])

  useEffect(() => {
    if (!ready) {
      dispatch(getMonitorings())
      dispatch(getMonitoringParameters())
      dispatch(getNotificationProviders())
      if (!readyGrades) {
        dispatch(getGrades())
      }
      if (!readyStacks) {
        dispatch(getStacks())
      }
      if (!readyResourceTypes) {
        dispatch(getResourceTypes())
      }
      if (!readyWorkTypes) {
        dispatch(getWorkTypes())
      }
      if (profile?.role === Roles.Admin) {
        dispatch(getUsers())
      }
    }
  }, [])

  return (
    <>
      <div className={classes.top}>
        <AddButton onClick={onOpenCreate}>Добавить мониторинг</AddButton>
      </div>

      {ready && !items.length && <NoData>Список мониторингов пуст</NoData>}

      {!!items.length && (
        <Box className={cx('table', 'contAfterTabs')}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 30 }} />
                  {monitoringsColumns.map((column) => (
                    <TableCell key={column.key} style={{ width: column.width }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={isLoading ? index : item.id}>
                    <TableCell>
                      <IconButton
                        disabled={isLoading}
                        disableRipple
                        onClick={(event) => {
                          openMenu(event, item)
                        }}
                      >
                        <MenuIcon />
                      </IconButton>
                    </TableCell>

                    {monitoringsColumns.map((column) => (
                      <TableCell key={column.key} loading={isLoading}>
                        <>
                          {!isLoading && (column.getValue ? column.getValue(item[column.key], item) : item[column.key])}
                        </>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>

              <ContextMenu anchorEl={menuContainer} onClose={closeMenu} open={openedMenu}>
                <MenuItem disableRipple onClick={onOpenEdit}>
                  <EditIcon />
                  Редактировать
                </MenuItem>

                <MenuItem color="error" disableRipple onClick={onOpenRemove}>
                  <DeleteIcon />
                  Удалить
                </MenuItem>
              </ContextMenu>
            </Table>
          </TableContainer>
        </Box>
      )}

      <MonitoringModal item={activeItem} onClose={onCloseEdit} open={openedModal} />

      <RemoveMonitoringModal
        loading={loadingRemove}
        onClose={closeRemoveModal}
        onRemove={() => onRemoveMonitoring(activeItem?.id)}
        open={openedRemoveModal}
      />
    </>
  )
}
