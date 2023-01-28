import { endpoints } from 'api/endpoints'
import { GetOneData, GetOneResponse } from 'interfaces/api.interfaces'
import { LoginData, Profile, TokenResponse } from 'interfaces/api/auth.interfaces'
import { axios } from 'modules/axios'

const login = async (form: LoginData): GetOneResponse<TokenResponse> => {
  const { data } = await axios.request<TokenResponse>({
    method: 'POST',
    url: endpoints.auth.login(),
    data: form,
  })
  return data
}

const logout = async (): Promise<void> => {
  await axios.request({
    method: 'POST',
    url: endpoints.auth.logout(),
  })
}

const refresh = async (): GetOneResponse<TokenResponse> => {
  const { data } = await axios.request<TokenResponse>({
    method: 'POST',
    url: endpoints.auth.refresh(),
  })
  return data
}

const getProfile = async (): GetOneResponse<Profile> => {
  const { data } = await axios.request<GetOneData<Profile>>({
    method: 'GET',
    url: endpoints.auth.getProfile(),
  })
  return data.data
}

export const authApi = {
  login,
  logout,
  refresh,
  getProfile,
}
