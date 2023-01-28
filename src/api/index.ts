import { createApi } from 'modules/api'

import { analyticsApi as analytics } from './methods/analytics'
import { appsApi as apps } from './methods/apps'
import { authApi as auth } from './methods/auth'
import { mlApi as ml } from './methods/ml'
import { monitoringsApi as monitorings } from './methods/monitorings'
import { notificationsApi as notifications } from './methods/notifications'
import { resourceTypesApi as resourceTypes } from './methods/resourceTypes'
import { rolesApi as roles } from './methods/roles'
import { sourcesApi as sources } from './methods/sources'
import { stacksApi as stacks } from './methods/stacks'
import { tasksApi as tasks } from './methods/tasks'
import { usersApi as users } from './methods/users'
import { workTypesApi as workTypes } from './methods/workTypes'

export const api = createApi({
  sources,
  stacks,
  resourceTypes,
  workTypes,
  tasks,
  apps,
  users,
  roles,
  analytics,
  auth,
  notifications,
  ml,
  monitorings,
})
