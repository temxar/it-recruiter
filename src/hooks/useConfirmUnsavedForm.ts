import { isEqualFormState } from '@###/sdd-helper'

export const useConfirmUnsavedForm = () => {
  const confirmUnsavedForm = (saved: any, unsaved: any, onClose: () => void) => {
    if (
      !saved ||
      !isEqualFormState(saved, unsaved) ||
      window.confirm('Есть несохраненные изменения. Вы уверены, что хотите покинуть страницу?')
    ) {
      onClose()
    }
  }
  return { confirmUnsavedForm }
}
