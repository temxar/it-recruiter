import { NoParamEndpointConstructor } from 'interfaces/api.interfaces'

const sources = 'sources'

interface Endpoints {
  getSources: NoParamEndpointConstructor
  searchSources: NoParamEndpointConstructor
}

export const sourcesEndpoints: Endpoints = {
  getSources: () => `/${sources}`,
  searchSources: () => `/output/${sources}`,
}
