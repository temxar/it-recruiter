import { FC, ReactNode } from 'react'

import { toArray } from '@@@/sdd-helper'
import cx from 'clsx'
import { ScrollBox } from 'components/shared/ScrollBox'

import classes from './DividedColumns.module.scss'

interface DividedColumnsProps {
  className?: string
  children?: ReactNode
  titles?: ReactNode[]
}

export const DividedColumns: FC<DividedColumnsProps> = ({ className, children, titles }) => (
  <div className={cx(classes.wrap, className)}>
    {toArray(children).map((column, index) => (
      <div className={classes.column} key={index}>
        {titles?.[index] && <div className={classes.title}>{titles?.[index]}</div>}
        <ScrollBox className={classes.scroll}>{column}</ScrollBox>
      </div>
    ))}
  </div>
)
