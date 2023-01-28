# Recruiter Frontend

## Скрипты

##### Установка зависимостей
```shell script
yarn
```

##### Production сборка
```shell script
yarn build:prod
```

##### Development сборка
```shell script
yarn build:dev
```

##### Запуск сервера для разработки
```shell script
yarn dev
```

##### Запуск линтера
```shell script
yarn lint
```
```shell script
yarn lint:css
```

##### Запуск prettier для проекта
```shell script
yarn format
```

## Разработка

* Управление состоянием - **redux** & **redux-toolkit**.
* Работа с формами - **react-hook-form** & **yup**.

## Структура
* **_templates** - шаблоны hygen
* **public** - статичный контент
* **src** - все исходники
    * **api** - cлой работы с api
        * endpoints - эндпоинты api
        * methods - методы, которые потом используются в приложении
        * mock - мокирование api
    * **assets** - глобальные стили (scss), шрифты, изображения
    * **components** - папка с группами компонентов
      * features - компоненты отдельных страниц
      * shared - переиспользуемые между страницами компоненты
      * template - основные компоненты приложения, компоненты для общего шаблона
    * **constants** - константы
    * **hocs** - компоненты высшего порядка - подключение прелоадера, предзагрузка информации, модальных окон, etc
    * **hooks** -  кастомные хуки, useTypedSelector, etc
    * **interfaces** - все переиспользуемые интерфейсы приложения
    * **layouts** лейауты
    * **pages** - страницы приложения
    * **routes** - роуты
    * **store** - всё, что относится к redux
    * **modules** - важные модули
    * **utils** - вспомогающие функции

### Создание компонентов

Компоненты создаются командами:
```shell script
yarn f - новый feature-component
yarn ff - новый feature-component в папке
yarn s - новый shared-component
yarn ss - новый shared-component в папке
yarn t - новый template-component
yarn p - новая страница
yarn l - новый layout
```

## Работа со стором
* redux-toolkit
  В редьюсерах используется функция createBuilder, которая позволяет экшены, возвращающие одно и то же, передавать в виде массива
```typescript
import { createBuilder } from '@/sdd-redux-toolkit'

export const chatReducer = createReducer(initialState, (builder) => {
  createBuilder(builder)
    .addCase([fetchCompanyProducts.pending, fetchCompanyProductsByCategory.pending], (state, { payload }) => {
      // Делаем что-то в сторе
    })
    .addCase(fetchChatRooms.pending, (state, { payload }) => {
      // Делаем что-то в сторе
    })
})
```

## Code style
* Для соблюдения единого стиля кода есть eslint, для форматирования - prettier, для стилей stylelint
* Стоит pre-commit hook с валидацией и форматированием (убедитесь, что он включен в вашем редакторе кода)
