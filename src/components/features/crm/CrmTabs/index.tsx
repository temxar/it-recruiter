import { FC } from 'react'

import ClientsIcon from '@mui/icons-material/BusinessCenterOutlined'
import ContactsIcon from '@mui/icons-material/FaceOutlined'
import DevelopersIcon from '@mui/icons-material/PeopleOutlineOutlined'
import SettingsIcon from '@mui/icons-material/TuneOutlined'
import LeadsIcon from '@mui/icons-material/ViewListOutlined'
import InterviewsIcon from '@mui/icons-material/VoiceChatOutlined'
import { CrmToolbarButtons } from 'components/features/crm/CrmToolbarButtons'
import { Tab } from 'components/shared/Tab'
import { Tabs } from 'components/shared/Tabs'
import { TabsToolbar } from 'components/shared/TabsToolbar'
import { Routes } from 'constants/routes'
import { useIdUrl } from 'hooks/useIdUrl'
import { Roles } from 'interfaces/api/roles.interfaces'
import { useAppSelector } from 'store'
import { selectProfileInfo } from 'store/profile/selectors'

interface SourcesTabsProps {
  className?: string
  value?: Routes
  onChange?: (value: Routes) => void
}

export const CrmTabs: FC<SourcesTabsProps> = ({ className, onChange, value }) => {
  const profile = useAppSelector(selectProfileInfo)
  const { id } = useIdUrl()

  const parentRoute = id ? (`${value?.slice(0, value.lastIndexOf('/'))}` as Routes) : value

  return (
    <TabsToolbar className={className} rightContent={<CrmToolbarButtons route={parentRoute} />}>
      <Tabs onChange={onChange} value={parentRoute}>
        <Tab icon={<LeadsIcon />} label="Лиды" value={Routes.Crm} />
        <Tab icon={<InterviewsIcon />} label="Интервью" value={Routes.Interviews} />
        ...
        {profile?.role === Roles.Admin && (
          <Tab icon={<SettingsIcon />} label="Параметры" value={Routes.CrmParameters} />
        )}
      </Tabs>
    </TabsToolbar>
  )
}
