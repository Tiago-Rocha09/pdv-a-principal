import List from "@/components/list"
import { Product } from "@/types/product"
import { FaBullseye, FaCheck } from "react-icons/fa"
import colors from '@/styles/variables.module.scss'
import styles from '../styles.module.scss'

export const listActions = (
    item: Product,
    handleSelectProduct: (item: Product) => void,
    getProductStock: (codProd: string) => Promise<void>
) => {
    return (<List.Actions>
        <List.Action
            text='Detalhes'
            endIcon={<FaBullseye color={colors.pinkStrongColor} />}
            type="button"
            className={styles.outlined}
            variant="outlined"
            onClick={() => getProductStock(item.codProd)}
        />
        <List.Action
            text='Adicionar'
            endIcon={<FaCheck color={colors.pinkStrongColor} />}
            type="button"
            className={styles.outlined}
            variant="outlined"
            onClick={() => handleSelectProduct(item)}
        />
    </List.Actions>)
}