import { FC } from 'react'

import CampaignIcon from '@mui/icons-material/CampaignOutlined'
import ChatIcon from '@mui/icons-material/ChatOutlined'
import GroupIcon from '@mui/icons-material/GroupOutlined'
import { Tab } from 'components/shared/Tab'
import { Tabs } from 'components/shared/Tabs'
import { SourceTabs } from 'interfaces/api/sources.interfaces'

interface SourcesTabsProps {
  className?: string
  value?: SourceTabs | 'all'
  onChange?: (value: SourceTabs | 'all') => void
}

export const SourcesTabs: FC<SourcesTabsProps> = ({ className, onChange, value }) => (
  <Tabs className={className} onChange={onChange} value={value}>
    <Tab label="Все источники" value="all" />
    <Tab icon={<GroupIcon />} label="Группы" value={SourceTabs.Groups} />
    <Tab icon={<CampaignIcon />} label="Каналы" value={SourceTabs.Channels} />
    <Tab icon={<ChatIcon />} label="Чаты" value={SourceTabs.Chats} />
  </Tabs>
)
