import { FC, useEffect, useState } from 'react'

import {
  Box,
  Checkbox,
  Skeleton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { useDeepCompareEffect } from 'ahooks'
import cx from 'clsx'
import { SourcesTabs } from 'components/features/sources/SourcesTabs'
import { SaveButton } from 'components/shared/SaveButton'
import { TableCell } from 'components/shared/TableCell'
import { defaultPageSize } from 'constants/app'
import { sourcesColumns } from 'constants/sources'
import { useChangeQueryParams } from 'hooks/useChangeQueryParams'
import { usePage } from 'hooks/usePage'
import { Source, SourceTabs } from 'interfaces/api/sources.interfaces'
import { useAppDispatch, useAppSelector } from 'store'
import { clearSources, getSources, selectSources } from 'store/sources/actions'

import classes from './SourcesList.module.scss'

interface SourcesGridProps {
  taskSources?: number[]
  onChange?: (selected: number[], sources: Source[]) => void
  appId?: number | null
}

export const SourcesList: FC<SourcesGridProps> = ({ taskSources = [], onChange, appId }) => {
  const [selected, setSelected] = useState<number[]>(taskSources)
  const [tabLoaded, setTabLoaded] = useState<SourceTabs | 'all'>('all')
  const [appIdLoaded, setAppIdLoaded] = useState<number | null>(null)

  const { data: sources, loading, ready, meta, pagesLoaded } = useAppSelector(selectSources)
  const isLoading = loading || !ready

  const { params, changeQueryParams } = useChangeQueryParams()
  const [tabInternal, setTabInternal] = useState<SourceTabs | 'all'>('all')
  const currentTab = (params.tab ?? tabInternal ?? 'all') as SourceTabs | 'all'

  const { page, changePage } = usePage()
  const [pageInternal, setPageInternal] = useState(1)
  const currentPage = onChange ? pageInternal : page

  const rowsPerPage = defaultPageSize.sources

  const items = (isLoading ? new Array(rowsPerPage - 1).fill(0) : pagesLoaded[currentPage] || []) as Source[]

  const dispatch = useAppDispatch()

  const onChangeTab = (newTab: SourceTabs | 'all') => {
    if (onChange) {
      setTabInternal(newTab)
      setPageInternal(1)
    } else {
      changeQueryParams({
        tab: newTab === 'all' ? null : newTab,
        page: null,
      })
    }
  }

  const onChangePage = (newPage: number) => {
    if (onChange) {
      setPageInternal(newPage)
    } else {
      changePage(newPage)
    }
  }

  const onSelect = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const onClickButton = () => {
    onChange?.(
      selected,
      (sources ?? []).filter((item) => selected.includes(item.id)),
    )
  }

  useEffect(() => {
    if (!pagesLoaded[currentPage] || tabLoaded !== currentTab || appIdLoaded !== appId) {
      setTabLoaded(currentTab)
      setAppIdLoaded(appId ?? null)
      if (tabLoaded !== currentTab) {
        dispatch(clearSources())
      }
      dispatch(
        getSources({
          tab: currentTab === 'all' ? null : currentTab,
          page: currentPage,
          perPage: rowsPerPage,
          appId,
        }),
      )
    }
  }, [currentTab, currentPage, appId])

  useDeepCompareEffect(() => {
    setSelected(taskSources)
  }, [taskSources])

  return (
    <Box className={classes.wrap}>
      <Box className={cx(classes.top, { [classes.topModal]: onChange })}>
        <SourcesTabs onChange={onChangeTab} value={currentTab} />
      </Box>

      <Box className={cx('table', 'contAfterTabs', { [classes.tableModal]: onChange })}>
        <TableContainer className={classes.cont}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {onChange && <TableCell padding="checkbox" sx={{ width: 90 }} />}
                {sourcesColumns.map((column) => (
                  <TableCell key={column.key} style={{ width: column.width }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((item, index) => {
                const isSelected = selected.includes(item.id)

                return (
                  <TableRow
                    className={cx({ [classes.rowClicked]: onChange })}
                    hover={!isLoading && !!onChange}
                    key={isLoading ? index : item.id}
                    onClick={() => onChange && onSelect(item.id)}
                    role="checkbox"
                    selected={isSelected}
                  >
                    {onChange && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          className={classes.checkbox}
                          color="primary"
                          disabled={isLoading}
                          inputProps={{
                            'aria-labelledby': `enhanced-table-checkbox-${index}`,
                          }}
                        />
                      </TableCell>
                    )}

                    {sourcesColumns.map((column) => (
                      <TableCell key={column.key} loading={isLoading}>
                        <>{!isLoading && (column.getValue ? column.getValue(item[column.key]) : item[column.key])}</>
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component={({ children }) => (
            <Box className={classes.paginate}>
              {children}
              {onChange && (
                <div className={classes.buttonCont}>
                  <SaveButton onClick={onClickButton}>Сохранить</SaveButton>
                </div>
              )}
            </Box>
          )}
          count={meta?.total || rowsPerPage}
          labelDisplayedRows={({ from, to, count }) => (
            <>{ready ? `${from}-${to} из ${count}` : <Skeleton sx={{ minWidth: '40px' }} variant="text" />}</>
          )}
          onPageChange={(_, newPage) => onChangePage(newPage + 1)}
          page={ready && meta ? (currentPage > meta.lastPage ? meta.lastPage : currentPage - 1) : 0}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </Box>
    </Box>
  )
}
