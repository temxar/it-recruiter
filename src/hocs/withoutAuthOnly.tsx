import { FC, ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Routes } from 'constants/routes'
import { useAppSelector } from 'store'
import { selectAuthenticated } from 'store/profile/selectors'

/**
 * Redirects on home page if user is logged in
 * @param Component Component
 * @returns Component
 */
export function withoutAuthOnly<T = any>(Component: FC<T>) {
  return (props: JSX.IntrinsicAttributes & T): ReactElement => {
    const navigate = useNavigate()

    const authenticated = useAppSelector(selectAuthenticated)

    useEffect(() => {
      ...
    }, [authenticated])

    return <Component {...props} />
  }
}
