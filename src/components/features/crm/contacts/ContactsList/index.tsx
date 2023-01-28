import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react'
import { generatePath, useLocation, useNavigate } from 'react-router-dom'

import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined'
import MenuIcon from '@mui/icons-material/MenuOutlined'
import {
  Box,
  Checkbox,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import cx from 'clsx'
import { ContactModal } from 'components/features/crm/contacts/ContactModal'
import { RemoveContactModal } from 'components/features/crm/contacts/RemoveContactModal'
import { ContextMenu } from 'components/shared/ContextMenu'
import { Pagination } from 'components/shared/Pagination'
import { TableCell } from 'components/shared/TableCell'
import { defaultPageSize } from 'constants/app'
import { crmContactColumns } from 'constants/crm'
import { Routes } from 'constants/routes'
import { storagePageSize } from 'constants/storage'
import { useIdUrl } from 'hooks/useIdUrl'
import { useModal } from 'hooks/useModal'
import { usePage } from 'hooks/usePage'
import { CrmContact } from 'interfaces/api/crm.interfaces'
import { useAppDispatch, useAppSelector } from 'store'
import { getContacts, removeContact, selectContacts } from 'store/crm/actions'
import { useLocalStorage } from 'usehooks-ts'

import classes from './ContactsList.module.scss'

export interface ContactsListProps {
  contacts?: number[]
  onChange?: (selected: number[], contacts: CrmContact[]) => void
  clientId?: number
}

export const ContactsList: FC<ContactsListProps> = ({ contacts = [], onChange, clientId }) => {
  const [itemId, setItemId] = useState<number | null>(null)
  const [selected, setSelected] = useState<number[]>(contacts)
  const [prevParams, setPrevParams] = useState('')
  const [loadingRemove, setLoadingRemove] = useState(false)
  const [menuContainer, setMenuContainer] = useState<HTMLElement | null>(null)
  const openedMenu = !!menuContainer

  const [rowsPerPage, setRowsPerPage] = useLocalStorage(storagePageSize, defaultPageSize)

  const { ready, meta, pagesLoaded, loading } = useAppSelector(selectContacts)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { search } = useLocation()
  const { page, changePage } = usePage()
  const { id: currentId } = useIdUrl()

  const isLoading = loading || !ready
  const currentPageSize = rowsPerPage.contacts || defaultPageSize.contacts
  const items = (loading ? new Array(currentPageSize - 1).fill(0) : pagesLoaded[page] || []) as CrmContact[]

  const [openedModal, openModal, closeModal] = useModal()
  const [openedRemoveModal, openRemoveModal, closeRemoveModal] = useModal()

  const openMenu = (event: MouseEvent<HTMLElement>, item: CrmContact) => {
    setMenuContainer(event.currentTarget)
    setItemId(item.id)
  }

  const closeMenu = () => {
    setMenuContainer(null)
    setTimeout(() => setItemId(null), 300)
  }

  const onOpenEdit = () => {
    if (itemId) {
      openModal()
      setMenuContainer(null)
      const path = generatePath(Routes.Contact, { id: itemId.toString() })
      navigate(path)
      setPrevParams(search)
    }
  }

  const onCloseEdit = () => {
    closeModal()
    navigate({ pathname: Routes.Contacts, search: prevParams })
    setTimeout(() => setItemId(null), 300)
  }

  const onOpenRemove = () => {
    openRemoveModal()
    setMenuContainer(null)
  }

  const onRemoveContact = () => {
    if (itemId) {
      setLoadingRemove(true)
      closeMenu()
      dispatch(
        removeContact({
          contactId: itemId,
          onFulfilled: () => {
            closeRemoveModal()
            setLoadingRemove(false)
          },
          onRejected: () => setLoadingRemove(false),
        }),
      )
    }
  }

  const onSelect = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const onNotSelect = (id: number) => {
    setSelected((prev) => prev.filter((item) => item !== id))
  }

  const onChangePage = (newPage: number) => {
    changePage(newPage)
  }

  const onChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    onChangePage(1)
    setRowsPerPage((prev) => ({ ...prev, contacts: Number(event.target.value) }))
  }

  const onSaveSelected = () => {
    if (onChange) {
      onChange(selected, items)
    }
  }

  useEffect(() => {
    if (ready && items.length && currentId) {
      setItemId(items.find((item) => item.id === currentId)?.id ?? null)
      openModal()
    }
  }, [ready, currentId])

  useEffect(() => {
    dispatch(
      getContacts({
        page,
        perPage: rowsPerPage.contacts,
      }),
    )
  }, [page])

  return (
    <Box className={cx('table', classes.wrap, { [classes.tableModal]: onChange })}>
      <TableContainer className={classes.cont}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {onChange ? <TableCell padding="checkbox" sx={{ width: 90 }} /> : <TableCell sx={{ width: 30 }} />}
              {crmContactColumns.map((column) => (
                <TableCell key={column.key} width={column.width}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((item, index) => {
              const disabled =
                isLoading ||
                !!(item.client?.id && clientId && item.client.id !== clientId) ||
                !!(!clientId && item.client?.id)
              const isSelected = selected.includes(item.id) && !disabled

              if (disabled && selected.includes(item.id)) {
                onNotSelect(item.id)
              }

              return (
                <TableRow
                  hover={!isLoading}
                  key={isLoading ? index : item.id}
                  onClick={() => onChange && !disabled && onSelect(item.id)}
                  role="checkbox"
                  selected={isSelected}
                >
                  {onChange ? (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        color="primary"
                        disabled={disabled}
                        disableRipple
                        inputProps={{ 'aria-labelledby': `enhanced-table-checkbox-${index}` }}
                      />
                    </TableCell>
                  ) : (
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
                  )}

                  {crmContactColumns.map((column) => (
                    <TableCell key={column.key} loading={isLoading} width={column.width}>
                      <>{!isLoading && (column.getValue ? column.getValue(item[column.key]) : item[column.key])}</>
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>

          <ContextMenu anchorEl={menuContainer} onClose={closeMenu} open={openedMenu}>
            <MenuItem disableRipple onClick={onOpenEdit}>
              <FileOpenOutlinedIcon />
              Открыть
            </MenuItem>

            <MenuItem color="error" disableRipple onClick={onOpenRemove}>
              <DeleteIcon />
              Удалить
            </MenuItem>
          </ContextMenu>
        </Table>
      </TableContainer>

      <Pagination
        meta={meta}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        onSave={onChange && onSaveSelected}
        page={page}
        ready={ready}
        rowsPerPage={currentPageSize}
      />

      {!onChange && <ContactModal contactId={itemId} onClose={onCloseEdit} open={openedModal} />}

      <RemoveContactModal
        loading={loadingRemove}
        onClose={closeRemoveModal}
        onDelete={onRemoveContact}
        open={openedRemoveModal}
      />
    </Box>
  )
}
