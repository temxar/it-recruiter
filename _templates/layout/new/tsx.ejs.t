---
  to: "<%= `${src}/index.tsx` %>"
---
import { FC, ReactNode } from 'react'

import classes from './<%= name %>.module.scss'

interface <%= name %>Props {
  children?: ReactNode
}

export const <%= name %>: FC<<%= name %>Props> = ({ children }) => <div className={classes.wrap}>{children}</div>
