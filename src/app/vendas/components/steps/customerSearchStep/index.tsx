
import List from "@/components/list"
import { FaCheck } from "react-icons/fa"
import { Customer } from "@/types/customer"
import { useSale } from "@/hooks/useSale"
import { SearchCustomer } from "@/components/customerSearch"

export const SearchCustomerStep = () => {

    const { handleSelectCustomer } = useSale()

    return (
        <SearchCustomer
            listActions={(item: Customer) => (<List.Actions>
                <List.Action text='Selecionar' endIcon={<FaCheck />} type="button" onClick={() => handleSelectCustomer(item)} />
            </List.Actions>)}
        />
    )
}