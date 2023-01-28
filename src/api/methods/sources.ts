import { deleteEmptyParams } from '@@@/sdd-helper'
import { endpoints } from 'api/endpoints'
import { GetAllData, GetAllResponse, GetArrayData, GetArrayResponse } from 'interfaces/api.interfaces'
import { ParamsGetSources, ParamsSearchSources, SearchSource, Source } from 'interfaces/api/sources.interfaces'
import { axios } from 'modules/axios'
import { defaultPagination, withoutPagination } from 'utils/pagination'

const getSources = async (params?: ParamsGetSources): GetAllResponse<Source> => {
  const { data } = await axios.request<GetAllData<Source>>({
    method: 'GET',
    url: endpoints.sources.getSources(),
    params: deleteEmptyParams({
      filter: {
        sources: params?.tab,
        appId: params?.appId,
      },
      ...withoutPagination(params),
      ...defaultPagination(params),
    }),
  })
  return data
}

const searchSources = async (params?: ParamsSearchSources): GetArrayResponse<SearchSource> => {
  const { data } = await axios.request<GetArrayData<SearchSource>>({
    method: 'GET',
    url: endpoints.sources.searchSources(),
    params: deleteEmptyParams({
      filter: {
        name: params?.name,
      },
    }),
  })
  return data.data
}

export const sourcesApi = {
  getSources,
  searchSources,
}
