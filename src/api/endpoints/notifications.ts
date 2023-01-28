import { NoParamEndpointConstructor, OneParamEndpointConstructor } from 'interfaces/api.interfaces'

const baseUrl = '/notifications'

interface Endpoints {
  getNotifications: NoParamEndpointConstructor
  removeAllNotifications: NoParamEndpointConstructor
  readAllNotifications: NoParamEndpointConstructor
  removeNotification: OneParamEndpointConstructor
}

export const notificationsEndpoints: Endpoints = {
  getNotifications: () => baseUrl,
  removeAllNotifications: () => baseUrl,
  readAllNotifications: () => `${baseUrl}/markallasread`,
  removeNotification: (notificationId) => `${baseUrl}/${notificationId}`,
}
