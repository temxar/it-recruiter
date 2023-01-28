export enum AnalyticsGroupTypes {
  Stack = 'stack',
  Grade = 'grade',
  ...
}

export const analyticsGroupTypes: Record<AnalyticsGroupTypes, string> = {
  [AnalyticsGroupTypes.Stack]: 'Стек',
  [AnalyticsGroupTypes.Grade]: 'Грейд',
  ...
}
