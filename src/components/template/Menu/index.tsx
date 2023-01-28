import { FC, SyntheticEvent } from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'

import CrmIcon from '@mui/icons-material/DashboardTwoTone'
import AnalyticsIcon from '@mui/icons-material/LeaderboardTwoTone'
import FeedIcon from '@mui/icons-material/ListAltTwoTone'
...
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import cx from 'clsx'
import { Routes } from 'constants/routes'
import { Roles } from 'interfaces/api/roles.interfaces'
import { TaskStatuses } from 'interfaces/api/tasks.interfaces'
import { useAppSelector } from 'store'
import { selectProfileInfo } from 'store/profile/selectors'

import classes from './Menu.module.scss'

interface MenuProps {
  loading?: boolean
}

export const Menu: FC<MenuProps> = ({ loading }) => {
  const profile = useAppSelector(selectProfileInfo)

  const navigate = useNavigate()
  const location = useLocation()

  const currentNavValue = matchPath({ path: Routes.Message }, location.pathname)
    ? Routes.Main
    : `/${location.pathname.slice(1).split('/')[0]}`

  const onClickNav = (event: SyntheticEvent, link: string) => {
    if (link === Routes.Tasks) {
      navigate({ pathname: link, search: `tab=${TaskStatuses.Active}` })
    } else {
      navigate(link)
    }
  }

  return (
    <BottomNavigation
      className={cx(classes.menu, { [classes.loadingMenu]: loading })}
      onChange={onClickNav}
      showLabels
      value={currentNavValue}
    >
      <BottomNavigationAction className={classes.item} icon={<FeedIcon />} label="Лента" value={Routes.Main} />
      <BottomNavigationAction className={classes.item} icon={<CrmIcon />} label="CRM" value={Routes.Crm} />

      {profile?.role === Roles.Admin && (
        <BottomNavigationAction
          className={classes.item}
          icon={<AnalyticsIcon />}
          label="Аналитика"
          value={Routes.Analytics}
        />
      )}

      ...
    </BottomNavigation>
  )
}
