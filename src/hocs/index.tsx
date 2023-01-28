import { FC } from 'react'

type Fn<T = any> = (...args: T[]) => FC<T>

/**
 * Helper function for composing HOCs
 * @param Component Component
 * @param functions HOCs
 */
export function compose<T = any>(Component: FC<T>, ...functions: Fn[]): FC<T> {
  return functions.reduce((acc: FC<T>, fn: Fn) => fn(acc), Component)
}
