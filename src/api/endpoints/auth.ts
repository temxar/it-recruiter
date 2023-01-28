import { NoParamEndpointConstructor } from 'interfaces/api.interfaces'

const baseUrl = '/auth'

interface Endpoints {
  login: NoParamEndpointConstructor
  logout: NoParamEndpointConstructor
  refresh: NoParamEndpointConstructor
  getProfile: NoParamEndpointConstructor
}

export const authEndpoints: Endpoints = {
  login: () => `${baseUrl}/login`,
  logout: () => `${baseUrl}/logout`,
  refresh: () => `${baseUrl}/refresh`,
  getProfile: () => `${baseUrl}/me`,
}
