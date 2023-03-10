export const apiErrors = {
  notFound: 'Ресурс не найден',
  notValid: 'Проверьте правильность передаваемых значений',
  unknownError: 'Произошла непредвиденная ошибка',
  incorrectAuth: 'Некорректные учетные данные',
  notSave: 'Ошибка при сохранении',
  notRemove: 'Ошибка при удалении',
}

export const errorsNoData = {
  profile: 'Не удалось загрузить данные профиля',
  feed: 'Не удалось загрузить ленту',
  sources: 'Не удалось загрузить источники',
  stacks: 'Не удалось загрузить список стеков',
  grades: 'Не удалось загрузить список грейдов',
  resourceTypes: 'Не удалось загрузить список типов',
  workTypes: 'Не удалось загрузить список форматов работы',
  feedCsv: 'Не удалось экспортировать в CSV',
  tasks: 'Не удалось загрузить задачи',
  apps: 'Не удалось загрузить список приложений',
  users: 'Не удалось загрузить список пользователей',
  roles: 'Не удалось загрузить список ролей',
  notifications: 'Не удалось загрузить список уведомлений',
  ml: 'Не удалось получить настройки ML-сервера',
  monitorings: 'Не удалось загрузить список мониторингов',
  monitoringParameters: 'Не удалось загрузить список параметров мониторинга',
  notificationProviders: 'Не удалось загрузить список провайдеров уведомлений',
  analytics: 'Не удалось загрузить аналитику',
  leadsStatuses: 'Не удалось загрузить статусы лидов',
  leads: 'Не удалось загрузить список лидов',
  lead: 'Не удалось загрузить лид',
  leadsSources: 'Не удалось загрузить типы источников лидов',
  interviewsStatuses: 'Не удалось загрузить статусы интервью',
  interviews: 'Не удалось загрузить список интервью',
  interview: 'Не удалось загрузить интервью',
  developersStatuses: 'Не удалось загрузить список статусов разработчиков',
  developers: 'Не удалось загрузить список разработчиков',
  developer: 'Не удалось загрузить данные разработчика',
  clients: 'Не удалось загрузить список клиентов',
  client: 'Не удалось загрузить данные клиента',
  contacts: 'Не удалось загрузить список контактов',
  contact: 'Не удалось загрузить данные контакта',
}

export const success = {
  taskStopped: 'Задача остановлена',
  taskStarted: 'Задача запущена',
  taskArchive: 'Задача помещена в архив',
  taskUnarchive: 'Задача удалена из архива',
  taskUpdated: 'Задача обновлена',
  taskRun: 'Задача запущена',
  taskCreated: 'Задача создана',
  stackCreated: 'Стек создан',
  stackUpdated: 'Стек обновлен',
  stackRemoved: 'Стек удален',
  appCreated: 'Добавлено новое приложение',
  appVerify: 'Приложение авторизовано, список источников обновляется',
  appRemoved: 'Приложение удалено',
  userCreated: 'Пользователь создан',
  blockUser: 'Пользователь заблокирован',
  unblockUser: 'Пользователь разблокирован',
  mlEnabled: (
    <>
      Автоматическая классификация через <span style={{ whiteSpace: 'nowrap' }}>ML-сервер</span> включена
    </>
  ),
  mlDisabled: (
    <>
      Автоматическая классификация через <span style={{ whiteSpace: 'nowrap' }}>ML-сервер</span> выключена
    </>
  ),
  monitoringCreated: 'Мониторинг создан',
  monitoringUpdated: 'Мониторинг обновлен',
  monitoringRemoved: 'Мониторинг удален',
  leadCreated: 'Лид создан',
  leadUpdated: 'Лид обновлен',
  leadRemoved: 'Лид удален',
  interviewCreated: 'Интервью создано',
  interviewUpdated: 'Интервью  обновлено',
  interviewRemoved: 'Интервью удалено',
  statusRemoved: 'Статус удален',
  leadsSourceCreated: 'Тип источника создан',
  leadsSourceUpdated: 'Тип источника обновлен',
  leadsSourceRemoved: 'Тип источника удален',
  developersStatusCreated: 'Статус разработчика создан',
  developersStatusUpdated: 'Статус разработчика обновлен',
  developersStatusRemoved: 'Статус разработчика удален',
  developerCreated: 'Разработчик создан',
  developerUpdated: 'Разработчик обновлен',
  developerRemoved: 'Разработчик удален',
  clientCreated: 'Клиент создан',
  clientUpdated: 'Клиент обновлен',
  clientRemoved: 'Клиент удален',
  contactCreated: 'Контакт создан',
  contactUpdated: 'Контакт обновлен',
  contactRemoved: 'Контакт удален',
}

export const validationErrors = {
  required: 'Поле обязательно для заполнения',
  notNumber: 'Должно быть числом',
  maxLengthFiles: 'Максимальное количество файлов: {max}',
  maxSize: 'Максимальный размер файла {max}',
  emptyFile: 'Файл не должен быть пустым',
  mediaFormatNotSupported: 'Можно загружать только файлы {types}',
  mediaFormatNotSupportedUnknown: 'Неподдерживаемый тип файла',
  maxLength: 'Максимальная длина: {max}',
  minLength: 'Минимальная длина: {min}',
  length: 'Должно быть {length} символов',
  incorrect: 'Некорректное значение',
  incorrectEmailFormat: 'Проверьте правильность введенного e-mail',
  incorrectUrl: 'Некорректный url',
}

export const customErrors = {
  emptyApp: 'Вы должны выбрать приложение',
  emptySources: 'Необходимо выбрать минимум 1 источник',
  notRun: 'Не удалось запустить задачу',
  appNotRemoved: 'Ошибка сервера, не удалось удалить приложение',
  incorrectDateInterval: 'Неверно указан диапазон дат',
  incorrectDate: 'Неверно указан дата',
}
