import { FC, forwardRef } from 'react'

import { toArray } from '@@@/sdd-helper'
import { Tab as TabNative, TabProps as TabPropsNative } from '@mui/material'
import cx from 'clsx'

import styles from './Tab.module.scss'

const TabComponent = forwardRef<HTMLDivElement, TabPropsNative>(({ children, ...props }, ref) => {
  const childrenArray = toArray(children)
  const icon = childrenArray[0].props?.children?.[0]
  const label = childrenArray[0].props?.children?.[1]

  return (
    <div {...props} ref={ref}>
      <span className={styles.cont}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {label && <span className={styles.label}>{label}</span>}
      </span>
      {childrenArray[1]}
    </div>
  )
})

export const Tab: FC<TabPropsNative> = ({ className, classes, disableRipple = true, ...props }) => (
  <TabNative
    classes={{ selected: styles.selected, ...classes }}
    className={cx(styles.tab, className)}
    disableRipple={disableRipple}
    iconPosition="start"
    wrapped
    {...props}
    component={TabComponent}
  />
)
