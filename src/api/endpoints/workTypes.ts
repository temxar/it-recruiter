import { NoParamEndpointConstructor } from 'interfaces/api.interfaces'

const baseUrl = '/work-types'

interface Endpoints {
  getWorkTypes: NoParamEndpointConstructor
}

export const workTypesEndpoints: Endpoints = {
  getWorkTypes: () => baseUrl,
}
