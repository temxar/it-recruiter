import { NoParamEndpointConstructor } from 'interfaces/api.interfaces'

const baseUrl = '/ml-service-settings'

interface Endpoints {
  getMlSettings: NoParamEndpointConstructor
  changeMlEnabled: NoParamEndpointConstructor
}

export const mlEndpoints: Endpoints = {
  getMlSettings: () => baseUrl,
  changeMlEnabled: () => baseUrl,
}
