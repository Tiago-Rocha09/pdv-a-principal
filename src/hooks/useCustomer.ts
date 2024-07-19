import { customerService } from "@/services/customer";
import { useStore } from "@/store";
import { Customer } from "@/types/customer";
import { useState } from "react";

export const useCustomer = () => {
  const storeId = useStore((state) => state.login.user?.storeId) as number;
  const selectedCustomer = useStore((state) => state.sales.selectedCustomer);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const listCustomers = async (searchTerm: string) => {
    try {
      setIsLoading(true);

      const response = await customerService.getCustomers(searchTerm, storeId);
      setIsLoading(false);
      setCustomers(response.data);
      console.log(response);
    } catch (error) {
      console.log({ error });
      setIsLoading(false);

      setCustomers([]);
    }
  };

  const totalCustomers = () => {
    if (!customers.length) {
      return "Nenhum cliente encontrado";
    } else if (customers.length === 1) {
      return "1 cliente encontrado";
    } else {
      return `${customers.length} clientes encontrados`;
    }
  };

  return {
    listCustomers,
    customers,
    totalCustomers,
    isLoading,
    selectedCustomer,
  };
};
