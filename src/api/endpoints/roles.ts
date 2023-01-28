import { NoParamEndpointConstructor } from 'interfaces/api.interfaces'

const baseUrl = '/roles'

interface Endpoints {
  getRoles: NoParamEndpointConstructor
}

export const rolesEndpoints: Endpoints = {
  getRoles: () => baseUrl,
}
