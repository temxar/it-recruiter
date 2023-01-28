import { useLocation, useNavigate } from 'react-router-dom'

import { deleteNullable } from '@###/sdd-helper'
import { parse, stringify } from 'qs'
import { ParsedUrlQueryInput } from 'querystring'

export const useChangeQueryParams = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const params = parse(location.search.slice(1))

  ...

  return { params, changeQueryParams }
}
