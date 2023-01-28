import { FC } from 'react'

...

import { Routes } from 'constants/routes'

import { ToolbarInterviewsButtons } from '../interviews/ToolbarInterviewsButtons'
import { ToolbarLeadsButtons } from '../leads/ToolbarLeadsButtons'

interface CrmToolbarButtonsProps {
  route?: Routes
}

export const CrmToolbarButtons: FC<CrmToolbarButtonsProps> = ({ route }) => (
  <>
    {route === Routes.Crm && <ToolbarLeadsButtons />}
    {route === Routes.Interviews && <ToolbarInterviewsButtons />}
    ...
  </>
)
