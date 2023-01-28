import { NoParamEndpointConstructor, OneParamEndpointConstructor } from 'interfaces/api.interfaces'

const baseUrl = '/tasks'

interface Endpoints {
  getTasks: NoParamEndpointConstructor
  changeTaskActivity: OneParamEndpointConstructor
  addTaskToArchive: OneParamEndpointConstructor
  removeTaskFromArchive: OneParamEndpointConstructor
  updateTask: OneParamEndpointConstructor
  runTask: OneParamEndpointConstructor
  createTask: NoParamEndpointConstructor
}

export const tasksEndpoints: Endpoints = {
  getTasks: () => baseUrl,
  changeTaskActivity: (taskId) => `${baseUrl}/${taskId}/activity`,
  addTaskToArchive: (taskId) => `${baseUrl}/${taskId}/archive`,
  removeTaskFromArchive: (taskId) => `${baseUrl}/${taskId}/dearchive`,
  updateTask: (taskId) => `${baseUrl}/${taskId}`,
  runTask: (taskId) => `${baseUrl}/${taskId}/run`,
  createTask: () => baseUrl,
}
