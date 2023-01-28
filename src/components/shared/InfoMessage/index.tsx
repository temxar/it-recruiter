import { FC, ReactNode } from 'react'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import cx from 'clsx'

import classes from './InfoMessage.module.scss'

interface InfoMessageProps {
  className?: string
  inModal?: boolean
  children?: ReactNode
}

export const InfoMessage: FC<InfoMessageProps> = ({ className, inModal, children }) => (
  <div className={cx(classes.wrap, className, { [classes.inModal]: inModal })}>
    <InfoOutlinedIcon />
    <span>{children}</span>
  </div>
)
