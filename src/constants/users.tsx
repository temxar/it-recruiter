import CircleIcon from '@mui/icons-material/Circle'
import { Box } from '@mui/material'
import { User } from 'interfaces/api/users.interfaces'
import { MuiColumn } from 'interfaces/common.interfaces'

export const usersColumns: readonly MuiColumn<keyof User>[] = [
  {
    key: 'id',
    label: 'ID',
    width: 100,
  },
  {
    key: 'name',
    label: 'Имя пользователя',
    width: 300,
  },
  {
    key: 'email',
    label: 'Email',
    width: 300,
  },
  {
    key: 'blocked',
    label: 'Статус',
    getValue: (value) =>
      value ? (
        <Box className="fl-al-c">
          <CircleIcon color="error" sx={{ paddingRight: '5px', fontSize: '12px' }} />
          Заблокирован
        </Box>
      ) : (
        <Box className="fl-al-c">
          <CircleIcon color="success" sx={{ paddingRight: '5px', fontSize: '12px' }} />
          Активен
        </Box>
      ),
  },
]
