import { NoParamEndpointConstructor } from 'interfaces/api.interfaces'

const baseUrl = '/types'

interface Endpoints {
  getResourceTypes: NoParamEndpointConstructor
}

export const resourceTypesEndpoints: Endpoints = {
  getResourceTypes: () => baseUrl,
}
