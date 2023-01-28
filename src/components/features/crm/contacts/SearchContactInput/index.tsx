import { FC, KeyboardEvent, useState } from 'react'

import CachedIcon from '@mui/icons-material/CachedOutlined'
import ClearIcon from '@mui/icons-material/ClearOutlined'
import SearchIcon from '@mui/icons-material/SearchOutlined'
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material'
import cx from 'clsx'
import { defaultPageSize, PagesWithPagination } from 'constants/app'
import { useChangeQueryParams } from 'hooks/useChangeQueryParams'
import { usePage } from 'hooks/usePage'
import storage from 'modules/storage'
import { useAppDispatch } from 'store'
import { getContacts } from 'store/crm/actions'

import classes from './SearchContactInput.module.scss'

export const SearchContactInput: FC = () => {
  const [searchValue, setSearchValue] = useState('')

  const dispatch = useAppDispatch()

  const { changeQueryParams } = useChangeQueryParams()
  const { page } = usePage()

  const onSearch = () => {
    changeQueryParams({ page: null, tab: null })
    dispatch(
      getContacts({
        page: null,
        perPage: defaultPageSize.contacts,
        filter: {
          name: searchValue,
        },
      }),
    )
  }

  const updateContacts = () => {
    setSearchValue('')
    dispatch(
      getContacts({
        page,
        perPage: storage.getPageSize(PagesWithPagination.Contacts),
      }),
    )
  }

  const onClear = () => {
    setSearchValue('')
    dispatch(
      getContacts({
        page: null,
        perPage: defaultPageSize.contacts,
        filter: {
          name: '',
        },
      }),
    )
  }

  return (
    <>
      <Tooltip className={classes.update} placement="bottom" title="Обновить список контактов">
        <IconButton disableRipple onClick={updateContacts}>
          <CachedIcon />
        </IconButton>
      </Tooltip>

      <TextField
        className={classes.search}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                className={cx(classes.clear, classes.searchIcon, { [classes.hide]: !searchValue })}
                disableRipple
                edge="end"
                onClick={onClear}
              >
                <ClearIcon />
              </IconButton>
              <IconButton className={classes.searchIcon} disableRipple edge="end" onClick={onSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(event) => {
          setSearchValue(event.target.value)
        }}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') {
            onSearch()
          }
        }}
        placeholder="Найти контакт по ФИО"
        size="small"
        value={searchValue}
      />
    </>
  )
}
