import { endpoints } from 'api/endpoints'
import { GetOneData, GetOneResponse } from 'interfaces/api.interfaces'
import { MlSettings } from 'interfaces/api/ml.interfaces'
import { axios } from 'modules/axios'

const getMlSettings = async (): GetOneResponse<MlSettings> => {
  const { data } = await axios.request<GetOneData<MlSettings>>({
    method: 'GET',
    url: endpoints.ml.getMlSettings(),
  })
  return data.data
}

const changeMlEnabled = async (enabled: boolean): GetOneResponse<MlSettings> => {
  const { data } = await axios.request<GetOneData<MlSettings>>({
    method: 'PUT',
    url: endpoints.ml.changeMlEnabled(),
    data: {
      isMlClassificationEnabled: enabled,
    },
  })
  return data.data
}

export const mlApi = {
  getMlSettings,
  changeMlEnabled,
}
