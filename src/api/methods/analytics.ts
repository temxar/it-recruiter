import { transformResponseDefault } from '@@@/sdd-api'
import { endpoints } from 'api/endpoints'
import { Analytics, ParamsGetAnalytics } from 'interfaces/api/analytics.interface'
import { axios } from 'modules/axios'

const getAnalytics = async (filters: ParamsGetAnalytics): Promise<Analytics[]> => {
  const { data } = await axios.request({
    method: 'GET',
    url: endpoints.analytics.getAnalytics(),
    params: { filter: filters },
    transformResponse: transformResponseDefault,
  })
  return data.data
}

export const analyticsApi = {
  getAnalytics,
}
