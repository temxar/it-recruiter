import { FC, useEffect } from 'react'

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import { CircularProgress } from '@mui/material'
import { useSafeState } from 'ahooks'
import { CrmDevelopersStatusModal } from 'components/features/crm/parameters/CrmDevelopersStatusModal'
import { RemoveDevelopersStatusModal } from 'components/features/crm/parameters/RemoveDevelopersStatusModal'
import { AddButton } from 'components/shared/AddButton'
import { Button, ButtonColors, ButtonSizes } from 'components/shared/Button'
import { CheckCircle } from 'components/shared/CheckCircle'
import { FlexBox } from 'components/shared/FlexBox'
import { ListItem } from 'components/shared/ListItem'
import { Tag, TagTypes } from 'components/shared/Tag'
import { colors } from 'constants/colors'
import { useModal } from 'hooks/useModal'
import { DeveloperStatus } from 'interfaces/api/developers.interfaces'
import { useAppDispatch, useAppSelector } from 'store'
import {
  getDevelopersStatuses,
  removeDevelopersStatuses,
  selectDevelopersStatuses,
  updateDevelopersStatuses,
} from 'store/developers/actions'

import classes from './CrmDevelopersStatusesList.module.scss'

interface CrmDevelopersStatusesListProps {
  className?: string
}

export const CrmDevelopersStatusesList: FC<CrmDevelopersStatusesListProps> = ({ className }) => {
  const [currentItem, setCurrentItem] = useSafeState<DeveloperStatus | null>(null)
  const [loadingRemove, setLoadingRemove] = useSafeState(false)

  const { data: statuses, loading, ready } = useAppSelector(selectDevelopersStatuses)
  const isLoading = loading || !ready

  const [openedModal, openModal, closeModal] = useModal()
  const [openedRemove, openRemove, closeRemove] = useModal()

  const dispatch = useAppDispatch()

  const onClose = () => {
    setTimeout(() => setCurrentItem(null), 300)
    closeModal()
  }

  const onClickAdd = () => {
    setCurrentItem(null)
    openModal()
  }

  const onClickEdit = (item: DeveloperStatus) => {
    setCurrentItem(item)
    openModal()
  }

  const onOpenRemove = (item: DeveloperStatus) => {
    setCurrentItem(item)
    openRemove()
  }

  const onRemove = () => {
    if (!currentItem) {
      return
    }
    setLoadingRemove(true)
    dispatch(
      removeDevelopersStatuses({
        statusId: currentItem.id,
        onFulfilled: () => {
          closeRemove()
          setLoadingRemove(false)
        },
        onRejected: () => setLoadingRemove(false),
      }),
    )
  }

  const updateDefault = (statusId: number, item: DeveloperStatus) => {
    dispatch(
      updateDevelopersStatuses({
        statusId,
        form: {
          name: item.name,
          color: item.color,
          isDefault: true,
        },
      }),
    )
  }

  useEffect(() => {
    if (!ready) {
      dispatch(getDevelopersStatuses())
    }
  }, [])

  return (
    <div className={className}>
      {isLoading && <CircularProgress size="20px" />}
      {!isLoading && (
        <>
          <div>
            {statuses?.map((item) => (
              <ListItem className={classes.item} key={item.id}>
                <FlexBox alignCenter>
                  <CheckCircle
                    checked={item.isDefault}
                    className={classes.check}
                    color={item.color}
                    onChange={(checked) => checked && updateDefault(item.id, item)}
                  />
                  <Tag className={classes.tag} color={item.color} type={TagTypes.Status}>
                    {item.name}
                  </Tag>
                </FlexBox>

                {!item.isStatic && (
                  <div className={classes.buttons}>
                    <Button
                      className={classes.button}
                      color={ButtonColors.White}
                      icon={<EditTwoToneIcon sx={{ color: colors.default }} />}
                      onClick={() => onClickEdit(item)}
                      size={ButtonSizes.Small}
                      stopPropagation
                    />
                    <Button
                      className={classes.button}
                      color={ButtonColors.White}
                      icon={<DeleteTwoToneIcon color="error" />}
                      onClick={() => onOpenRemove(item)}
                      size={ButtonSizes.Small}
                      stopPropagation
                    />
                  </div>
                )}
              </ListItem>
            ))}
          </div>
          <div className={classes.bottom}>
            <AddButton color={ButtonColors.Blue} fullWidth onClick={onClickAdd}>
              Добавить
            </AddButton>
          </div>
        </>
      )}

      <CrmDevelopersStatusModal item={currentItem} onClose={onClose} open={openedModal} />

      <RemoveDevelopersStatusModal
        disableRemove={!!currentItem?.total}
        loading={loadingRemove}
        onClose={closeRemove}
        onRemove={onRemove}
        open={openedRemove}
      />
    </div>
  )
}
