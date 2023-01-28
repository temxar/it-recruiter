import { FC } from 'react'

import { Box, SvgIcon } from '@mui/material'
import { ReactComponent as LogoImage } from 'assets/images/logo_white.svg'
import cx from 'clsx'

import classes from './Logo.module.scss'

interface LogoProps {
  className?: string
}

export const Logo: FC<LogoProps> = ({ className }) => (
  <Box className={cx(classes.wrap, className)}>
    <SvgIcon className={classes.logo} component={LogoImage} inheritViewBox />
  </Box>
)
