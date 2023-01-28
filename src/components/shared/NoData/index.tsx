import { FC, ReactNode } from 'react'

import AppsIcon from '@mui/icons-material/Apps'
import { Box, Typography } from '@mui/material'

import classes from './NoData.module.scss'

interface NoDataProps {
  children?: ReactNode
}

export const NoData: FC<NoDataProps> = ({ children }) => (
  <Box className={classes.noData}>
    <Box className={classes.noDataCont}>
      <AppsIcon color="primary" />
      <Typography className={classes.noDataText}>{children}</Typography>
    </Box>
  </Box>
)
