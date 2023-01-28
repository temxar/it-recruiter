import { FC } from 'react'

import { LinkBlank } from 'components/shared/LinkBlank'

interface ContactCellTelegramProps {
  value?: string
}

export const ContactCellTelegram: FC<ContactCellTelegramProps> = ({ value }) =>
  value ? <LinkBlank href={value}>{value}</LinkBlank> : null
