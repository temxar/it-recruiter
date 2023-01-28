import { NoParamEndpointConstructor, OneParamEndpointConstructor } from 'interfaces/api.interfaces'

const baseUrl = '/app'

interface Endpoints {
  getApps: NoParamEndpointConstructor
  createApp: NoParamEndpointConstructor
  verifyApp: NoParamEndpointConstructor
  removeApp: OneParamEndpointConstructor
}

export const appsEndpoints: Endpoints = {
  getApps: () => baseUrl,
  createApp: () => baseUrl,
  verifyApp: () => `${baseUrl}/verify`,
  removeApp: (appId) => `${baseUrl}/${appId}`,
}
