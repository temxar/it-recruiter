import { FC, ReactNode } from 'react'

import cx from 'clsx'
import { TagTypes } from 'components/shared/Tag'

import classes from './TagsInput.module.scss'

interface TagsInputProps {
  className?: string
  children?: ReactNode
  tagType?: TagTypes
}

export const TagsInput: FC<TagsInputProps> = ({ className, children, tagType = TagTypes.Default }) => (
  <div className={cx(classes.wrap, className, classes[tagType])}>
    <div className={classes.cont}>{children}</div>
  </div>
)
