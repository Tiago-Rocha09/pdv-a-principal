import { salesService } from "@/services/sales";
import { useStore } from "@/store";
import { Customer } from "@/types/customer";
import { SaleTypeResponse } from "@/types/sales";
import { OptionSelect, OptionSelectApi } from "@/types/select";
import { useCallback, useState } from "react";

const steps = [0, 0.5, 1];

export const useSale = () => {
  const storeId = useStore((state) => state.login.user?.storeId) as number;
  const activeStep = useStore((state) => state.sales.activeStep);
  const isLoading = useStore((state) => state.sales.isLoading);
  const setIsLoading = useStore((state) => state.sales.setIsLoading);
  const setActiveStep = useStore((state) => state.sales.setActiveStep);
  const setSelectedSaleType = useStore(
    (state) => state.sales.setSelectedSaleType
  );
  const setSelectedCustomer = useStore(
    (state) => state.sales.setSelectedCustomer
  );

  const [saleTypes, setSaleTypes] = useState<OptionSelect[]>([]);

  const handleSelectCustomer = (selectedCustomer: Customer) => {
    console.log({ selectedCustomer });

    setSelectedCustomer(selectedCustomer);
    handleNextStep();
  };

  const handleSelectSaleType = (selectedSaleType: number) => {
    console.log({ selectedSaleType });

    setSelectedSaleType(selectedSaleType);
    handleNextStep();
  };

  const listSaleTypes = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await salesService.getSaleTypes(storeId);
      if (response.status === 200) {
        const data: SaleTypeResponse = response.data;
        setSaleTypes(
          data.tiposVenda.map((item: OptionSelectApi) => ({
            value: item.id,
            label: item.name,
          }))
        );
      } else {
        setSaleTypes([]);
      }
      setIsLoading(false);
    } catch (error) {
      setSaleTypes([]);
    }
  }, [setIsLoading, storeId]);

  const handleNextStep = () => {
    const currentStepIndex = steps.findIndex((item) => item === activeStep);
    setActiveStep(steps[currentStepIndex + 1]);
  };

  const handlePreviousStep = () => {
    const currentStepIndex = steps.findIndex((item) => item === activeStep);
    if (currentStepIndex > 0) {
      setActiveStep(steps[currentStepIndex - 1]);
    }
  };

  return {
    activeStep,
    saleTypes,
    isLoading,
    listSaleTypes,
    handleSelectCustomer,
    handlePreviousStep,
    handleSelectSaleType
  };
};
