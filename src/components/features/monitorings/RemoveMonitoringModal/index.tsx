import { FC } from 'react'

import { Dialog, DialogTitle } from '@mui/material'
import { Button } from 'components/shared/Button'
import { Close } from 'components/shared/Close'
import { DialogActions } from 'components/shared/DialogActions'
import { RemoveButton } from 'components/shared/RemoveButton'

interface RemoveMonitoringModalProps {
  onClose?: () => void
  open?: boolean
  onRemove?: () => void
  loading?: boolean
}

export const RemoveMonitoringModal: FC<RemoveMonitoringModalProps> = ({ onClose, open, onRemove, loading }) => (
  <Dialog onClose={onClose} open={!!open}>
    <Close onClick={onClose} />
    <DialogTitle>Удалить мониторинг?</DialogTitle>
    <DialogActions fullWidth>
      <Button onClick={onClose}>Отмена</Button>
      <RemoveButton loading={loading} onClick={onRemove}>
        Удалить
      </RemoveButton>
    </DialogActions>
  </Dialog>
)
