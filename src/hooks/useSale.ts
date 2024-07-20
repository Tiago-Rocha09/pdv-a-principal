import { salesService } from "@/services/sales";
import { useStore } from "@/store";
import { Customer } from "@/types/customer";
import { SaleConfigurationResponse, SaleTypeResponse } from "@/types/sales";
import { OptionSelect, OptionSelectApi } from "@/types/select";
import { useCallback, useState } from "react";
import { useAlert } from "./useAlert";

const steps = [
  0, //Buscar/selecionar cliente
  0.5, //Selecionar tipo de venda
  1, //Carrinho com lista de produtos
  1.1, //Buscar/selecionar/ver detalhes do produto
  1.2, //Definir desconto/quantidade do produto e adicionar no carrinho
];

type SalesTypeOptionSelect = {
  tabPrice: 1;
  local: 1;
} & OptionSelect;

export const useSale = () => {
  const { showAlert } = useAlert();
  const storeId = useStore((state) => state.login.user?.storeId) as number;
  const [activeStep, setActiveStep] = useStore((state) => [
    state.sales.activeStep,
    state.sales.setActiveStep,
  ]);
  const [isLoading, setIsLoading] = useStore((state) => [
    state.sales.isLoading,
    state.sales.setIsLoading,
  ]);
  const [cartItems, setCartItems] = useStore((state) => [
    state.sales.cartItems,
    state.sales.setCartItems,
  ]);
  const [selectedSaleType, setSelectedSaleType] = useStore((state) => [
    state.sales.selectedSaleType,
    state.sales.setSelectedSaleType,
  ]);
  const [configuration, setConfiguration] = useStore((state) => [
    state.sales.configuration,
    state.sales.setConfiguration,
  ]);
  const [selectedTabPrice, setSelectedTabPrice] = useStore((state) => [
    state.sales.selectedTabPrice,
    state.sales.setSelectedTabPrice,
  ]);
  const setSelectedCustomer = useStore(
    (state) => state.sales.setSelectedCustomer
  );

  const [saleTypes, setSaleTypes] = useState<SalesTypeOptionSelect[]>([]);

  const handleSelectCustomer = (selectedCustomer: Customer) => {
    setSelectedCustomer(selectedCustomer);
    handleNextStep();
  };

  const handleSelectSaleType = (selectedSaleType: number) => {
    setSelectedSaleType(selectedSaleType);
    const tabPrice =
      saleTypes.find((item) => item.value === selectedSaleType)?.tabPrice ||
      null;

    setSelectedTabPrice(tabPrice);
    handleNextStep();
  };

  const listSaleTypes = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await salesService.getSaleTypes(storeId);
      if (response.status === 200) {
        const data: SaleTypeResponse = response.data;
        setSaleTypes(
          data.tiposVenda.map((item: any) => ({
            value: item.id,
            label: item.name,
            tabPrice: item.codTabelaPadrao,
            local: item.localEstoquePadrao,
          }))
        );
      } else {
        setSaleTypes([]);
      }
      setIsLoading(false);
    } catch (error) {
      setSaleTypes([]);
    }
  }, [storeId]);

  const getConfiguration = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await salesService.getConfiguration(storeId);
      if (response.status === 200) {
        const data: SaleConfigurationResponse = response.data;
        setConfiguration(data);
      } else {
        setConfiguration(null);
      }
      setIsLoading(false);
    } catch (error) {
      setConfiguration(null);
    }
  }, [storeId]);

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

  const handleGoToStep = (step: number) => {
    if (steps.indexOf(step) < 0) {
      return showAlert({
        title: "Erro ao acessar página",
        text: "Não conseguimos identificar qual etapa você deve acessar",
      });
    }
    setActiveStep(step);
  };

  return {
    activeStep,
    saleTypes,
    isLoading,
    selectedTabPrice,
    configuration,
    selectedSaleType,
    listSaleTypes,
    handleSelectCustomer,
    handlePreviousStep,
    handleSelectSaleType,
    handleNextStep,
    getConfiguration,
    handleGoToStep
  };
};
