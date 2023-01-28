import { analyticsEndpoints as analytics } from './analytics'
import { appsEndpoints as apps } from './apps'
import { authEndpoints as auth } from './auth'
import { mlEndpoints as ml } from './ml'
import { monitoringsEndpoints as monitorings } from './monitorings'
import { notificationsEndpoints as notifications } from './notifications'
import { resourceTypesEndpoints as resourceTypes } from './resourceTypes'
import { rolesEndpoints as roles } from './roles'
import { sourcesEndpoints as sources } from './sources'
import { stacksEndpoints as stacks } from './stacks'
import { tasksEndpoints as tasks } from './tasks'
import { usersEndpoints as users } from './users'
import { workTypesEndpoints as workTypes } from './workTypes'

export const endpoints = {sources,
  stacks,
  tasks,
  apps,
  users,
  roles,
  analytics,
  notifications,
  auth,
  ml,
  monitorings,
  resourceTypes,
  workTypes,
}
