import { FC, ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Routes } from 'constants/routes'
import { useAppSelector } from 'store'
import { selectAuthenticated, selectReady } from 'store/profile/selectors'

/**
 * Redirects on login page if user is not logged in
 * @param Component Component
 * @returns Component
 */
export function withAuthOnly<T = any>(Component: FC<T>) {
  return (props: JSX.IntrinsicAttributes & T): ReactElement => {
    const navigate = useNavigate()

    const authenticated = useAppSelector(selectAuthenticated)
    const ready = useAppSelector(selectReady)

    useEffect(() => {
      ...

    return <Component {...props} />
  }
}
