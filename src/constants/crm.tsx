import { ClientCellContacts } from 'components/features/crm/clients/ClientsList/cells/ClientCellContacts'
import { ContactCellClient } from 'components/features/crm/contacts/ContactsList/cells/ContactCellClient'
import { ContactCellTelegram } from 'components/features/crm/contacts/ContactsList/cells/ContactCellTelegram'
import { MuiColumn } from 'interfaces/common.interfaces'

export enum CrmClientsColumns {
  ...
}

export const crmClientColumns: readonly MuiColumn<CrmClientsColumns>[] = [
  ...
]

export enum CrmContactsColumns {
  ...
}

export const crmContactColumns: readonly MuiColumn<CrmContactsColumns>[] = [
  ...
]
