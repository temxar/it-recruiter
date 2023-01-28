import { FC } from 'react'

import { AddButton } from 'components/shared/AddButton'
import { useModal } from 'hooks/useModal'

import { ContactModal } from '../ContactModal'

export const AddContactButton: FC = () => {
  const [openedContactModal, openContactModal, closeContactModal] = useModal()

  return (
    <>
      <AddButton onClick={openContactModal}>Добавить контакт</AddButton>
      <ContactModal onClose={closeContactModal} open={openedContactModal} />
    </>
  )
}
