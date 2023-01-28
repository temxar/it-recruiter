import { Column } from 'interfaces/common.interfaces'

export enum FeedColumns {
  Id = 'id',
  SentDate = 'sentDate',
  Text = 'text',
  Source = 'source',
  Stack = 'stack',
  ...
}

export const feedColumns: Column<FeedColumns>[] = [
  { name: FeedColumns.Id, title: '№' },
  ...
]
