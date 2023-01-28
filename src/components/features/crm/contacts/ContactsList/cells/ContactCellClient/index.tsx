import { FC } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'

import ClientsIcon from '@mui/icons-material/BusinessCenterOutlined'
import { IconBlock } from 'components/shared/IconBlock'
import { Routes } from 'constants/routes'
import { CrmValue } from 'interfaces/api/crm.interfaces'

interface ContactCellClientProps {
  value?: CrmValue
}

export const ContactCellClient: FC<ContactCellClientProps> = ({ value }) => {
  const navigate = useNavigate()

  const onClick = () => {
    if (value?.id) {
      const path = generatePath(Routes.Client, { id: value.id.toString() })
      navigate(path)
    }
  }

  return value ? (
    <IconBlock icon={<ClientsIcon />} onClick={onClick}>
      {value.name}
    </IconBlock>
  ) : null
}
