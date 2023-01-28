import { endpoints } from 'api/endpoints'
import { GetArrayData, GetArrayResponse } from 'interfaces/api.interfaces'
import { ResourceType } from 'interfaces/api/resourceTypes.interfaces'
import { axios } from 'modules/axios'

const getResourceTypes = async (): GetArrayResponse<ResourceType> => {
  const { data } = await axios.request<GetArrayData<ResourceType>>({
    method: 'GET',
    url: endpoints.resourceTypes.getResourceTypes(),
  })
  return data.data
}

export const resourceTypesApi = {
  getResourceTypes,
}
