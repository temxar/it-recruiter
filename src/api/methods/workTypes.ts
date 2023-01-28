import { endpoints } from 'api/endpoints'
import { GetArrayData, GetArrayResponse } from 'interfaces/api.interfaces'
import { WorkType } from 'interfaces/api/workTypes.interfaces'
import { axios } from 'modules/axios'

const getWorkTypes = async (): GetArrayResponse<WorkType> => {
  const { data } = await axios.request<GetArrayData<WorkType>>({
    method: 'GET',
    url: endpoints.workTypes.getWorkTypes(),
  })
  return data.data
}

export const workTypesApi = {
  getWorkTypes,
}
