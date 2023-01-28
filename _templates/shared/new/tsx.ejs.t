---
  to: "<%= `${src}/index.tsx` %>"
---
import { FC } from 'react'

import cx from 'clsx'

import classes from './<%= name %>.module.scss'

interface <%= name %>Props {
  className?: string
}

export const <%= name %>: FC<<%= name %>Props> = ({ className }) => <div className={cx(classes.wrap, className)}><%= name %></div>
