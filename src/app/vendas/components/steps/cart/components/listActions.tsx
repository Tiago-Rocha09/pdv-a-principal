import List from "@/components/list"
import { Stack } from "@mui/material"
import styles from '../styles.module.scss'
import colors from '@/styles/variables.module.scss'
import { FaEdit, FaTrash } from "react-icons/fa"

type listActionsProps = {
    index: number
    handleRemoveFromCart: (index: number) => void
    handleEditCartProduct: (index: number) => void

}
export const listActions = ({
    index,
    handleRemoveFromCart,
    handleEditCartProduct
}: listActionsProps) => {
    return (<List.Actions>
        <Stack className={styles.itemActionContainer}>
            <FaEdit color={colors.pinkStrongColor} size={25} onClick={() => handleEditCartProduct(index)} />
            <FaTrash color={colors.pinkStrongColor} size={25} onClick={() => handleRemoveFromCart(index)} />
        </Stack>
    </List.Actions>)
}