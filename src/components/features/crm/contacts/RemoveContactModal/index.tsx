import { FC } from 'react'

import { Dialog, DialogTitle } from '@mui/material'
import { Button } from 'components/shared/Button'
import { Close } from 'components/shared/Close'
import { DialogActions } from 'components/shared/DialogActions'
import { RemoveButton } from 'components/shared/RemoveButton'

interface RemoveContactModalProps {
  onClose?: () => void
  open?: boolean
  onDelete?: () => void
  loading?: boolean
}

export const RemoveContactModal: FC<RemoveContactModalProps> = ({ onClose, open, onDelete, loading }) => (
  <Dialog onClose={onClose} open={!!open}>
    <Close onClick={onClose} />
    <DialogTitle>Удалить контакт?</DialogTitle>
    <DialogActions fullWidth>
      <Button onClick={onClose}>Отмена</Button>
      <RemoveButton loading={loading} onClick={onDelete}>
        Удалить
      </RemoveButton>
    </DialogActions>
  </Dialog>
)
