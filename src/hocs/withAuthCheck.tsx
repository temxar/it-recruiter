import { FC, ReactElement, useEffect } from 'react'

import { storageAuthName } from 'constants/storage'
import { useLogout } from 'hooks/useLogout'
import { setAxiosAuthorizationToken } from 'modules/axios'
import storage from 'modules/storage'
import { useAppDispatch, useAppSelector } from 'store'
import { setAuthenticated } from 'store/profile/actions'
import { selectAuthenticated } from 'store/profile/selectors'
import { useLocalStorage } from 'usehooks-ts'

/**
 * Auto login if token exists in storage
 * @param Component Component
 * @returns Component
 */
export function withAuthCheck<T = any>(Component: FC<T>) {
  return (props: JSX.IntrinsicAttributes & T): ReactElement => {
    const authenticated = useAppSelector(selectAuthenticated)
    const [authLocal] = useLocalStorage<{ value: boolean } | null>(storageAuthName, { value: false })

    const { logout } = useLogout()
    const dispatch = useAppDispatch()

    useEffect(() => {
      ...
    }, [authLocal?.value])

    return <Component {...props} />
  }
}
