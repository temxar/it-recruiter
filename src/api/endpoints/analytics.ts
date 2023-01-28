import { NoParamEndpointConstructor } from 'interfaces/api.interfaces'

const baseUrl = '/analytics'

interface Endpoints {
  getAnalytics: NoParamEndpointConstructor
}

export const analyticsEndpoints: Endpoints = {
  getAnalytics: () => baseUrl,
}
