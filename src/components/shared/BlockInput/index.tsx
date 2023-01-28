import { FC, ReactNode } from 'react'

import cx from 'clsx'
import { EditInputButton } from 'components/shared/EditInputButton'

import classes from './BlockInput.module.scss'

interface BlockInputProps {
  className?: string
  children?: ReactNode
  onClickEdit?: () => void
  heightAuto?: boolean
  disabledEdit?: boolean
}

export const BlockInput: FC<BlockInputProps> = ({ className, children, onClickEdit, heightAuto, disabledEdit }) => (
  <div className={cx(classes.wrap, className, { [classes.heightAuto]: heightAuto })}>
    <span className={classes.cont}>{children}</span>
    {!disabledEdit && <EditInputButton onClick={onClickEdit} />}
  </div>
)
