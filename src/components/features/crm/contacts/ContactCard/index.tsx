import { FC } from 'react'

import EmailIcon from '@mui/icons-material/AlternateEmailOutlined'
import PhoneIcon from '@mui/icons-material/LocalPhoneOutlined'
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined'
import SendIcon from '@mui/icons-material/SendOutlined'
import cx from 'clsx'
import { ContactModal } from 'components/features/crm/contacts/ContactModal'
import { Close, CloseTypes } from 'components/shared/Close'
import { IconText } from 'components/shared/IconText'
import { LinkBlank } from 'components/shared/LinkBlank'
import { ListItem } from 'components/shared/ListItem'
import { useModal } from 'hooks/useModal'
import { CrmContact } from 'interfaces/api/crm.interfaces'

import classes from './ContactCard.module.scss'

interface ContactCardProps {
  className?: string
  item?: Partial<CrmContact>
  onRemove?: () => void
}

export const ContactCard: FC<ContactCardProps> = ({ className, item, onRemove }) => {
  const [openedContactModal, openContactModal, closeContactModal, isMountedModal] = useModal()

  return (
    <>
      <ListItem className={cx(classes.wrap, className)} onClick={openContactModal}>
        {onRemove && <Close onClick={onRemove} type={CloseTypes.Micro} />}

        {item?.name && (
          <IconText className={cx(classes.item, classes.name)} icon={<PersonIcon />}>
            {item.name}
          </IconText>
        )}
        {item?.phone && (
          <IconText className={classes.item} icon={<PhoneIcon />}>
            {item.phone}
          </IconText>
        )}
        {item?.email && (
          <IconText className={classes.item} icon={<EmailIcon />}>
            <LinkBlank disabledIcon href={`mailto:${item.email}`} stopPropagation>
              {item.email}
            </LinkBlank>
          </IconText>
        )}
        {item?.tgLink && (
          <IconText className={classes.item} icon={<SendIcon />}>
            <LinkBlank disabledIcon href={item.tgLink} stopPropagation>
              Написать
            </LinkBlank>
          </IconText>
        )}
      </ListItem>

      {isMountedModal && <ContactModal contactId={item?.id} onClose={closeContactModal} open={openedContactModal} />}
    </>
  )
}
