import List from '@/components/list'
import { Stack } from '@mui/material'
import styles from '../styles.module.scss'
import colors from '@/styles/variables.module.scss'
import { FaEdit, FaTrash } from 'react-icons/fa'

type listActionsProps = {
  installmentNumber: number
  handleRemoveInstallment: (installmentNumber: number) => void
  handleEditInstallment: (installmentNumber: number) => void
}
export const listActions = ({
  installmentNumber,
  handleRemoveInstallment,
  handleEditInstallment,
}: listActionsProps) => {
  return (
    <List.Actions>
      <Stack className={styles.itemActionContainer}>
        <FaEdit
          color={colors.pinkStrongColor}
          size={25}
          onClick={() => handleEditInstallment(installmentNumber)}
        />
        <FaTrash
          color={colors.pinkStrongColor}
          size={25}
          onClick={() => handleRemoveInstallment(installmentNumber)}
        />
      </Stack>
    </List.Actions>
  )
}
