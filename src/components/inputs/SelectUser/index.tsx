import { FC } from 'react'

import { Select } from 'components/shared/Select'
import { Roles } from 'interfaces/api/roles.interfaces'
import { User } from 'interfaces/api/users.interfaces'
import { uniqBy } from 'lodash'
import { useAppSelector } from 'store'
import { selectProfileInfo } from 'store/profile/selectors'
import { selectUsers } from 'store/users/actions'

interface SelectUserProps {
  className?: string
  disabled?: boolean
  value?: number | null
  onChange?: (value: number | null) => void
  fontSmall?: boolean
}

export const SelectUser: FC<SelectUserProps> = ({ className, disabled, value, onChange, fontSmall }) => {
  const { data: users } = useAppSelector(selectUsers)
  const profile = useAppSelector(selectProfileInfo)
  const items = (profile && users ? uniqBy([...users, { id: profile.id, name: profile.name }], 'id') : users) as
    | User[]
    | null

  return (
    <Select
      className={className}
      disabled={profile?.role !== Roles.Admin || disabled}
      fontSmall={fontSmall}
      items={items}
      onChange={onChange}
      value={value}
    />
  )
}
