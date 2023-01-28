import { endpoints } from 'api/endpoints'
import { GetArrayData, GetArrayResponse, GetOneData, GetOneResponse } from 'interfaces/api.interfaces'
import { Stack, StackForm } from 'interfaces/api/stacks.interfaces'
import { axios } from 'modules/axios'

const getStacks = async (): GetArrayResponse<Stack> => {
  const { data } = await axios.request<GetArrayData<Stack>>({
    method: 'GET',
    url: endpoints.stacks.getStacks(),
  })
  return data.data
}

const createStack = async (form: StackForm): GetOneResponse<Stack> => {
  const { data } = await axios.request<GetOneData<Stack>>({
    method: 'POST',
    url: endpoints.stacks.createStack(),
    data: form,
  })
  return data.data
}

const updateStack = async (stackId: number, form: StackForm): GetOneResponse<Stack> => {
  const { data } = await axios.request<GetOneData<Stack>>({
    method: 'PUT',
    url: endpoints.stacks.updateStack(stackId),
    data: form,
  })
  return data.data
}

const removeStack = async (stackId: number): Promise<void> => {
  await axios.request({
    method: 'DELETE',
    url: endpoints.stacks.removeStack(stackId),
  })
}

export const stacksApi = {
  getStacks,
  createStack,
  updateStack,
  removeStack,
}
