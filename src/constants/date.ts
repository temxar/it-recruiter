export const monthsRu: string[][] = [
  ['январь', 'января'],
  ['февраль', 'февраля'],
  ['март', 'марта'],
  ['апрель', 'апреля'],
  ['май', 'мая'],
  ['июнь', 'июня'],
  ['июль', 'июля'],
  ['август', 'августа'],
  ['сентябрь', 'сентября'],
  ['октябрь', 'октября'],
  ['ноябрь', 'ноября'],
  ['декабрь', 'декабря'],
]

export enum Periods {
  Month = 'month',
  Week = 'week',
  Day = 'day',
}

export const periodsTitle: Record<Periods, string> = {
  [Periods.Month]: 'месяц',
  [Periods.Week]: 'неделя',
  [Periods.Day]: 'день',
}
