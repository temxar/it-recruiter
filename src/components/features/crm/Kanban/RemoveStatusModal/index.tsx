import { FC } from 'react'

import { Dialog, DialogTitle } from '@mui/material'
import { StatusTitle } from 'components/features/crm/Kanban/StatusTitle'
import { Button } from 'components/shared/Button'
import { Close } from 'components/shared/Close'
import { DialogActions } from 'components/shared/DialogActions'
import { InfoMessage } from 'components/shared/InfoMessage'
import { RemoveButton } from 'components/shared/RemoveButton'

import classes from './RemoveStatusModal.module.scss'

interface RemoveStatusModalProps {
  onClose?: () => void
  open?: boolean
  onRemove?: () => void
  loading?: boolean
  statusName?: string
  statusColor?: string | null
  disableRemove?: boolean
}

export const RemoveStatusModal: FC<RemoveStatusModalProps> = ({
  onClose,
  open,
  onRemove,
  loading,
  statusName,
  statusColor,
  disableRemove,
}) => (
  <Dialog onClose={onClose} open={!!open} PaperProps={{ className: classes.wrap }}>
    <Close onClick={onClose} />

    {disableRemove ? (
      <InfoMessage inModal>
        Чтобы удалить статус, нужно переместить или удалить все карточки с этим статусом
      </InfoMessage>
    ) : (
      <>
        <DialogTitle>
          Удалить статус{' '}
          <StatusTitle className={classes.title} color={statusColor}>
            {statusName}
          </StatusTitle>{' '}
          ?
        </DialogTitle>
        <DialogActions fullWidth>
          <Button onClick={onClose}>Отмена</Button>
          <RemoveButton loading={loading} onClick={onRemove}>
            Удалить
          </RemoveButton>
        </DialogActions>
      </>
    )}
  </Dialog>
)
