import { endpoints } from 'api/endpoints'
import { GetArrayData, GetArrayResponse, GetOneData, GetOneResponse } from 'interfaces/api.interfaces'
import { User, UserForm } from 'interfaces/api/users.interfaces'
import { axios } from 'modules/axios'

const getUsers = async (): GetArrayResponse<User> => {
  const { data } = await axios.request<GetArrayData<User>>({
    method: 'GET',
    url: endpoints.users.getUsers(),
  })
  return data.data
}

const createUser = async (form: UserForm): GetOneResponse<User> => {
  const { data } = await axios.request<GetOneData<User>>({
    method: 'POST',
    url: endpoints.users.createUser(),
    data: form,
  })
  return data.data
}

const blockUser = async (userId: number): GetOneResponse<User> => {
  const { data } = await axios.request<GetOneData<User>>({
    method: 'PUT',
    url: endpoints.users.blockUser(userId),
  })
  return data.data
}

const unblockUser = async (userId: number): GetOneResponse<User> => {
  const { data } = await axios.request<GetOneData<User>>({
    method: 'PUT',
    url: endpoints.users.unblockUser(userId),
  })
  return data.data
}

export const usersApi = {
  getUsers,
  createUser,
  blockUser,
  unblockUser,
}
