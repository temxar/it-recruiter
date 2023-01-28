import { endpoints } from 'api/endpoints'
import { GetArrayData, GetArrayResponse } from 'interfaces/api.interfaces'
import { Role } from 'interfaces/api/roles.interfaces'
import { axios } from 'modules/axios'

const getRoles = async (): GetArrayResponse<Role> => {
  const { data } = await axios.request<GetArrayData<Role>>({
    method: 'GET',
    url: endpoints.roles.getRoles(),
  })
  return data.data
}

export const rolesApi = {
  getRoles,
}
