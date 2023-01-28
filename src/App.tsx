import { FC } from 'react'

import { compose } from 'hocs'
import { withAuthCheck } from 'hocs/withAuthCheck'
import { withProviders } from 'hocs/withProviders'
import { RenderRoute } from 'routes'

const App: FC = () => <RenderRoute />

export default compose(App, withAuthCheck, withProviders)
