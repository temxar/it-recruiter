import { NoParamEndpointConstructor, OneParamEndpointConstructor } from 'interfaces/api.interfaces'

const baseUrl = '/stack'

interface Endpoints {
  getStacks: NoParamEndpointConstructor
  createStack: NoParamEndpointConstructor
  updateStack: OneParamEndpointConstructor
  removeStack: OneParamEndpointConstructor
}

export const stacksEndpoints: Endpoints = {
  getStacks: () => baseUrl,
  createStack: () => baseUrl,
  updateStack: (stackId) => `${baseUrl}/${stackId}`,
  removeStack: (stackId) => `${baseUrl}/${stackId}`,
}
