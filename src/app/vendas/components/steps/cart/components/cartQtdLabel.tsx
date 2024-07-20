import { CartProduct } from "@/types/product"
import { Chip } from "@mui/material"

export const CartQtdLabel = ({ cartItems }: { cartItems: CartProduct[] }) => {
    if (cartItems.length === 0) return <Chip label="Nenhum produto na cesta" />
    if (cartItems.length === 1) return <Chip label="1 produto na cesta" />
    return <Chip label={`${cartItems.length} produtos na cesta`} />
}