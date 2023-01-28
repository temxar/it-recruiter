import { NoParamEndpointConstructor, OneParamEndpointConstructor } from 'interfaces/api.interfaces'

const baseUrl = '/users'

interface Endpoints {
  getUsers: NoParamEndpointConstructor
  createUser: NoParamEndpointConstructor
  blockUser: OneParamEndpointConstructor
  unblockUser: OneParamEndpointConstructor
}

export const usersEndpoints: Endpoints = {
  getUsers: () => baseUrl,
  createUser: () => baseUrl,
  blockUser: (userId) => `${baseUrl}/${userId}/block`,
  unblockUser: (userId) => `${baseUrl}/${userId}/unblock`,
}
