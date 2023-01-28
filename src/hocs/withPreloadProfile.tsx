import { FC, ReactElement, useEffect } from 'react'

import { currentVersion } from 'constants/storage'
import storage from 'modules/storage'
import { useAppDispatch, useAppSelector } from 'store'
import { getProfile } from 'store/profile/actions'
import { selectAuthenticated } from 'store/profile/selectors'

/**
 * Fetch profile info
 * @param Component Component
 * @returns Component
 */
export function withPreloadProfile<T = any>(Component: FC<T>) {
  return (props: JSX.IntrinsicAttributes & T): ReactElement => {
    const authenticated = useAppSelector(selectAuthenticated)

    const version = storage.getVersion()
    if (version !== currentVersion) {
      storage.clearDeprecatedData()
    }

    const dispatch = useAppDispatch()

    useEffect(() => {
      ...
    }, [authenticated])

    return <Component {...props} />
  }
}
