import { useParams } from 'react-router-dom'

interface UseIdURLReturnType {
  id: number | null
}

export const useIdUrl = (): UseIdURLReturnType => {
  const { id } = useParams()

  return { id: !Number.isNaN(Number(id)) ? Number(id) : null }
}
