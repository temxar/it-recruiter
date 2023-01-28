import { FC } from 'react'

import { Toolbar } from 'components/template/Toolbar'
import { Routes } from 'constants/routes'

import { CrmSearchInput } from '../CrmSearchInput'

interface CrmToolbarProps {
  route?: Routes
}

export const CrmToolbar: FC<CrmToolbarProps> = ({ route }) => (
  <Toolbar title="CRM">
    <CrmSearchInput route={route} />
  </Toolbar>
)
