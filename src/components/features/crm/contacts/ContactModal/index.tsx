import { FC, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useSafeState } from 'ahooks'
import cx from 'clsx'
import { RemoveContactModal } from 'components/features/crm/contacts/RemoveContactModal'
import { CrmDates } from 'components/features/crm/CrmDates'
import { SelectClient } from 'components/inputs/SelectClient'
import { BlockInput } from 'components/shared/BlockInput'
import { Button } from 'components/shared/Button'
import { Close } from 'components/shared/Close'
import { DialogActions } from 'components/shared/DialogActions'
import { EditButton } from 'components/shared/EditButton'
import { FlexBox } from 'components/shared/FlexBox'
import { FormItem } from 'components/shared/FormItem'
import { LinkBlank } from 'components/shared/LinkBlank'
import { Loader } from 'components/shared/Loader'
import { RemoveButton } from 'components/shared/RemoveButton'
import { SaveButton } from 'components/shared/SaveButton'
import { SecondaryTitle } from 'components/shared/SecondaryTitle'
import { useConfirmUnsavedForm } from 'hooks/useConfirmUnsavedForm'
import { useModal } from 'hooks/useModal'
import { CrmContactForm } from 'interfaces/api/crm.interfaces'
import { useInitForm } from 'modules/rhf'
import { contactSchema } from 'modules/validation'
import { useAppDispatch, useAppSelector } from 'store'
import {
  addClientToStore,
  createContact,
  getContact,
  removeContact,
  selectContact,
  updateContact,
} from 'store/crm/actions'

import classes from './ContactModal.module.scss'

interface ContactModalProps {
  contactId?: number | null
  open?: boolean
  onClose?: () => void
}

export const ContactModal: FC<ContactModalProps> = ({ contactId, open, onClose }) => {
  const [enabledForm, setEnabledForm] = useState(true)
  const [showInputLink, setShowInputLink] = useState(true)
  const [readyForm, setReadyForm] = useState(false)
  const [loadingSave, setLoadingSave] = useState(false)
  const [initValues, setInitValues] = useSafeState<CrmContactForm>()

  const { data: itemStore, loading, ready } = useAppSelector(selectContact)
  const item = itemStore?.id === contactId ? itemStore : null
  const isLoading = contactId && (loading || !ready || !readyForm)

  const [loadingRemove, setLoadingRemove] = useState(false)
  const [openedRemoveModal, openRemoveModal, closeRemoveModal] = useModal()

  const dispatch = useAppDispatch()
  const { confirmUnsavedForm } = useConfirmUnsavedForm()

  const { control, getValues, handleSubmit, reset, setError } = useInitForm<CrmContactForm>({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      name: '',
      clientId: null,
      phone: '',
      email: '',
      tgLink: '',
      comment: '',
    },
  })

  const onSuccessClose = () => {
    setLoadingSave(false)
    onClose?.()
  }

  const onCloseInternal = () => {
    confirmUnsavedForm(initValues, getValues(), onSuccessClose)
  }

  const onCancel = () => {
    if (item && enabledForm) {
      setEnabledForm(false)
    } else {
      onCloseInternal()
    }
  }

  const setErrors = (errors?: Record<keyof CrmContactForm, string> | null) => {
    if (errors) {
      Object.keys(errors).forEach((key) => {
        setError(key as keyof CrmContactForm, {
          message: errors[key as keyof CrmContactForm],
        })
      })
    }
  }

  const onSubmit = (data: CrmContactForm) => {
    setLoadingSave(true)
    if (item) {
      dispatch(
        updateContact({
          contactId: item.id,
          form: data,
          onFulfilled: onSuccessClose,
          onRejected: (errors) => {
            setErrors(errors)
            setLoadingSave(false)
          },
        }),
      )
    } else {
      dispatch(
        createContact({
          form: data,
          onFulfilled: () => {
            onSuccessClose()
            setTimeout(reset, 300)
          },
          onRejected: (errors) => {
            setErrors(errors)
            setLoadingSave(false)
          },
        }),
      )
    }
  }

  const onRemoveContact = () => {
    if (contactId) {
      setLoadingRemove(true)
      dispatch(
        removeContact({
          contactId,
          onFulfilled: () => {
            closeRemoveModal()
            setLoadingRemove(false)
            onClose?.()
          },
          onRejected: () => setLoadingRemove(false),
        }),
      )
    }
  }

  useEffect(() => {
    if (open && item && item.id === contactId) {
      if (item.tgLink) {
        setShowInputLink(false)
      }
      reset({
        name: item.name,
        clientId: item.client?.id ?? null,
        phone: item.phone ?? '',
        email: item.email ?? '',
        tgLink: item.tgLink ?? '',
        comment: item.comment ?? '',
      })
      setInitValues(getValues())
      setReadyForm(true)
      if (item.client) {
        dispatch(addClientToStore(item.client))
      }
      setEnabledForm(false)
    }
  }, [item, open])

  useEffect(() => {
    if (open && contactId && !(item && item.id === contactId)) {
      dispatch(getContact(contactId))
      setReadyForm(false)
    }
  }, [open, contactId])

  return (
    <Dialog onClose={onCloseInternal} open={!!open} PaperProps={{ className: classes.wrap }}>
      <Close onClick={onCloseInternal} />

      {isLoading && <Loader />}
      {!isLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {contactId ? 'Редактирование' : 'Создание'} контакта
            {contactId && <SecondaryTitle>ID: {contactId}</SecondaryTitle>}
            <CrmDates createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
          </DialogTitle>

          <DialogContent className={cx(classes.cont, 'scroll')}>
            <div className={classes.left}>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState: { error: errorInput } }) => (
                  <FormItem error={errorInput?.message} label="ФИО" required={enabledForm}>
                    <TextField disabled={!enabledForm} fullWidth size="small" {...field} />
                  </FormItem>
                )}
              />

              <Controller
                control={control}
                name="clientId"
                render={({ field, fieldState: { error: errorInput } }) => (
                  <FormItem error={errorInput?.message} label="Клиент">
                    <SelectClient disabled={!enabledForm} onChange={field.onChange} value={field.value} />
                  </FormItem>
                )}
              />

              <Controller
                control={control}
                name="comment"
                render={({ field, fieldState: { error: errorInput } }) => (
                  <FormItem error={errorInput?.message} label="Примечание">
                    <TextField disabled={!enabledForm} fullWidth multiline rows={6} size="small" {...field} />
                  </FormItem>
                )}
              />
            </div>

            <div className={classes.right}>
              <Controller
                control={control}
                name="phone"
                render={({ field, fieldState: { error: errorInput } }) => (
                  <FormItem error={errorInput?.message} label="Телефон">
                    <TextField disabled={!enabledForm} fullWidth size="small" {...field} />
                  </FormItem>
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field, fieldState: { error: errorInput } }) => (
                  <FormItem error={errorInput?.message} label="Email">
                    <TextField disabled={!enabledForm} fullWidth size="small" {...field} />
                  </FormItem>
                )}
              />

              <Controller
                control={control}
                name="tgLink"
                render={({ field, fieldState: { error: errorInput } }) => (
                  <FormItem error={errorInput?.message} label="Телеграм">
                    {showInputLink ? (
                      <TextField disabled={!enabledForm} fullWidth size="small" {...field} />
                    ) : (
                      <BlockInput disabledEdit={!enabledForm} onClickEdit={() => setShowInputLink(true)}>
                        <LinkBlank href={field.value}>{field.value}</LinkBlank>
                      </BlockInput>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </DialogContent>

          <DialogActions spaceBetween>
            <div>
              {contactId && (
                <FlexBox>
                  <RemoveButton onClick={openRemoveModal}>Удалить контакт</RemoveButton>
                  {!enabledForm && <EditButton onClick={() => setEnabledForm(true)}>Редактировать контакт</EditButton>}
                </FlexBox>
              )}
            </div>
            <FlexBox>
              <Button onClick={onCancel}>Отмена</Button>
              {enabledForm && (
                <SaveButton loading={loadingSave} onClick={handleSubmit(onSubmit)}>
                  {contactId ? 'Сохранить' : 'Добавить'}
                </SaveButton>
              )}
            </FlexBox>
          </DialogActions>
        </form>
      )}

      <RemoveContactModal
        loading={loadingRemove}
        onClose={closeRemoveModal}
        onDelete={onRemoveContact}
        open={openedRemoveModal}
      />
    </Dialog>
  )
}
