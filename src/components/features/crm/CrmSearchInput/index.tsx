import { FC } from 'react'
import { matchPath } from 'react-router-dom'

import { Routes } from 'constants/routes'

import { SearchClientInput } from '../clients/SearchClientInput'
import { SearchContactInput } from '../contacts/SearchContactInput'
import { SearchDeveloperInput } from '../developers/SearchDeveloperInput'

interface CrmSearchInputProps {
  route?: Routes
}

export const CrmSearchInput: FC<CrmSearchInputProps> = ({ route }) => (
  <>
    {(route === Routes.Developers || (route && !!matchPath({ path: Routes.Developer }, route))) && (
      <SearchDeveloperInput />
    )}
    {(route === Routes.Contacts || (route && !!matchPath({ path: Routes.Contact }, route))) && <SearchContactInput />}
    {(route === Routes.Clients || (route && !!matchPath({ path: Routes.Client }, route))) && <SearchClientInput />}
  </>
)
