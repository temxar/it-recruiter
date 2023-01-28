import { FC } from 'react'

import { Box, CircularProgress, Typography } from '@mui/material'

import classes from './LoaderApp.module.scss'

export const LoaderApp: FC = () => (
  <Box className={classes.loader}>
    <CircularProgress />
    <Typography color="text.secondary" sx={{ marginTop: '20px' }} variant="body2">
      Загрузка приложения...
    </Typography>
  </Box>
)
