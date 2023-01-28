import { ReactElement, ReactNode } from 'react'

import { Box, Tabs as TabsNative } from '@mui/material'
import cx from 'clsx'

import classes from './Tabs.module.scss'

interface TabsProps<Value = string | number> {
  className?: string
  children?: ReactNode
  value?: Value
  onChange?: (value: Value) => void
}

export const Tabs = <Value extends string | number>({
  className,
  children,
  value,
  onChange,
}: TabsProps<Value>): ReactElement => (
  <Box className={cx(classes.wrap, className)}>
    <TabsNative
      classes={{ indicator: classes.indicator }}
      className={classes.tabs}
      onChange={(_, key: Value) => onChange?.(key)}
      value={value}
    >
      {children}
    </TabsNative>
  </Box>
)
