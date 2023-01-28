import { NoParamEndpointConstructor, OneParamEndpointConstructor } from 'interfaces/api.interfaces'

const baseUrl = '/monitorings'

interface Endpoints {
  getMonitorings: NoParamEndpointConstructor
  getMonitoring: OneParamEndpointConstructor
  createMonitoring: NoParamEndpointConstructor
  updateMonitoring: OneParamEndpointConstructor
  removeMonitoring: OneParamEndpointConstructor
  getMonitoringParameters: NoParamEndpointConstructor
  getNotificationProviders: NoParamEndpointConstructor
}

export const monitoringsEndpoints: Endpoints = {
  getMonitorings: () => baseUrl,
  getMonitoring: (monitoringId) => `${baseUrl}/${monitoringId}`,
  createMonitoring: () => baseUrl,
  updateMonitoring: (monitoringId) => `${baseUrl}/${monitoringId}`,
  removeMonitoring: (monitoringId) => `${baseUrl}/${monitoringId}`,
  getMonitoringParameters: () => '/monitoring-parameter-types',
  getNotificationProviders: () => '/notification-provider-types',
}
