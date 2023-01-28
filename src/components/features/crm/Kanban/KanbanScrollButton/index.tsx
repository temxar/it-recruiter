import { FC } from 'react'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import cx from 'clsx'

import classes from './KanbanScrollButton.module.scss'

interface KanbanScrollButtonProps {
  className?: string
  to: 'prev' | 'next'
  hide?: boolean
  onClick?: () => void
}

export const KanbanScrollButton: FC<KanbanScrollButtonProps> = ({ className, to, hide, onClick }) => (
  <div className={cx(classes.button, className, classes[to], { [classes.hide]: hide })} onClick={onClick}>
    {to === 'next' ? <ChevronRight className={classes.icon} /> : <ChevronLeftIcon className={classes.icon} />}
  </div>
)
