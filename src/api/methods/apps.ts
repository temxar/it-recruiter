import { endpoints } from 'api/endpoints'
import { GetArrayData, GetArrayResponse, GetOneData, GetOneResponse } from 'interfaces/api.interfaces'
import { AppForm, AppItem, AppVerificationForm } from 'interfaces/api/apps.interfaces'
import { createApiError } from 'modules/api'
import { axios } from 'modules/axios'

const getApps = async (): GetArrayResponse<AppItem> => {
  const { data } = await axios.request<GetArrayData<AppItem>>({
    method: 'GET',
    url: endpoints.apps.getApps(),
  })
  return data.data
}

const createApp = async (form: AppForm): GetOneResponse<AppItem> =>
  axios
    .request<GetOneData<AppItem>>({
      method: 'POST',
      url: endpoints.apps.createApp(),
      data: form,
    })
    .then(({ data }) => data.data)
    .catch((error) => {
      const errorCode = error.original?.errorCode
      if (errorCode === 'INVALID_REQUEST' || errorCode === 'INVALID_APPLICATION_CREDENTIALS') {
        throw createApiError({
          message: 'Указаны неверные учётные данные',
          detail: 'Не удалось зарегистрировать приложение. Проверьте введённые данные и попробуйте ещё раз',
        })
      }
      if (errorCode === 'APPLICATION_ALREADY_EXIST') {
        throw createApiError({
          message: 'Приложение уже добавлено',
          detail: 'Приложение которое вы хотите добавить уже есть в вашем списке приложений',
        })
      }
      throw createApiError({
        message: 'Ошибка сервера',
        detail: 'Произошла внутренняя ошибка. Попробуйте повторить попытку позже',
      })
    })

const verifyApp = async (form: AppVerificationForm): GetOneResponse<AppItem> =>
  axios
    .request<GetOneData<AppItem>>({
      method: 'POST',
      url: endpoints.apps.verifyApp(),
      data: form,
    })
    .then(({ data }) => data.data)
    .catch((error) => {
      const errorCode = error.original?.errorCode
      if (errorCode === 'AUTH_CODE_INVALID' || errorCode === 'INVALID_REQUEST') {
        throw createApiError({
          message: 'Неверный код',
          detail: 'При достижении лимита ввода ваше приложение будет заблокировано',
        })
      }

      if (errorCode === 'AUTH_CODE_EXPIRED') {
        throw createApiError({
          message: 'Введённый код недействителен',
          detail: 'Новый код для авторизации был отправлен на телеграмм аккаунт, привязанный к номеру',
        })
      }

      throw createApiError({
        message: 'Ошибка сервера',
        detail: 'Произошла внутренняя ошибка. Попробуйте повторить попытку позже',
      })
    })

const removeApp = async (appId: number): Promise<void> => {
  await axios.request({
    method: 'DELETE',
    url: endpoints.apps.removeApp(appId),
  })
}

export const appsApi = {
  getApps,
  createApp,
  verifyApp,
  removeApp,
}
