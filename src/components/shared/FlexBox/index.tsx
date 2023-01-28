import { FC, ReactNode } from 'react'

import { Box, BoxProps } from '@mui/material'
import cx from 'clsx'

import classes from './FlexBox.module.scss'

interface FlexBoxProps extends BoxProps {
  spaceBetween?: boolean
  alignCenter?: boolean
  children?: ReactNode
}

export const FlexBox: FC<FlexBoxProps> = ({ className, alignCenter, spaceBetween, children, ...props }) => (
  <Box
    className={cx(classes.wrap, className)}
    {...props}
    sx={{
      display: 'flex',
      alignItems: alignCenter ? 'center' : undefined,
      justifyContent: spaceBetween ? 'space-between' : undefined,
      ...props.sx,
    }}
  >
    {children}
  </Box>
)
