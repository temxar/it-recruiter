import { TableColumnWidthInfo } from 'interfaces/common.interfaces'

import { FeedColumns } from './feed'

export const appName = '###'

export const defaultPageSizes = [20, 50, 100]

export enum PagesWithPagination {
  Feed = 'feed',
  Sources = 'sources',
  Developers = 'developers',
  Clients = 'clients',
  Contacts = 'contacts',
}

export const defaultPageSize: Record<PagesWithPagination, number> = {
  [PagesWithPagination.Feed]: defaultPageSizes[0],
  [PagesWithPagination.Sources]: 25,
  [PagesWithPagination.Developers]: defaultPageSizes[0],
  [PagesWithPagination.Clients]: defaultPageSizes[0],
  [PagesWithPagination.Contacts]: defaultPageSizes[0],
}

export interface DefaultColumnsWidth extends Record<string, TableColumnWidthInfo[]> {
  feed: TableColumnWidthInfo<FeedColumns>[]
}

export const defaultColumnsWidth: DefaultColumnsWidth = {
  feed: [
    { columnName: FeedColumns.Id, width: 135 },
    { columnName: FeedColumns.SentDate, width: 100 },
    { columnName: FeedColumns.Text, width: 375 },
    { columnName: FeedColumns.Source, width: 205 },
    { columnName: FeedColumns.Stack, width: 275 },
    ...
  ],
}

export interface DefaultColumnsOrder extends Record<string, string[]> {
  feed: FeedColumns[]
}

export const defaultColumnsOrder: DefaultColumnsOrder = {
  feed: [
    FeedColumns.Id,
    FeedColumns.SentDate,
    FeedColumns.Text,
    FeedColumns.Source,
    FeedColumns.Stack,
    ...
  ],
}
