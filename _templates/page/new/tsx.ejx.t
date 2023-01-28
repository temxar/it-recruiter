---
  to: "<%= `${src}/index.tsx` %>"
---
import { FC } from 'react'

import { useTitle } from 'ahooks'
import { appName } from 'constants/app'
import { PageLayout } from 'layouts/PageLayout'

const <%= name %>Page: FC = () => {
  useTitle(`<%= name %>Page | ${appName}`)

  return (
    <PageLayout>
      <%= name %>Page
    </PageLayout>
  )
}

export default <%= name %>Page
