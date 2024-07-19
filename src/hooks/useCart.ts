import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { useStore } from "@/store";
import { CartProduct, Product } from "@/types/product";
import { useSale } from "./useSale";
import { AddProductSchema } from "@/app/vendas/components/steps/addProduct/addProduct.schema";
import { useAlert } from "./useAlert";
import { UseFormSetValue } from "react-hook-form";

export const useCart = () => {
  const { handleNextStep, configuration, selectedSaleType } = useSale();
  const { showAlert } = useAlert();
  const storeId = useStore((state) => state.login.user?.storeId) as number;

  const [cartItems, setCartItems] = useStore((state) => [
    state.sales.cartItems,
    state.sales.setCartItems,
  ]);

  const [selectedProduct, setSelectedProduct] = useStore((state) => [
    state.sales.selectedProduct,
    state.sales.setSelectedProduct,
  ]);

  const handleAddItem = (item: CartProduct) => {
    const newCart = [...cartItems, item];
    setCartItems(newCart);
    setSelectedProduct(null);
  };

  const handleSelectProduct = (item: Product) => {
    console.log({ item });
    const selected: CartProduct = {
      ...item,
      desconto: 0,
      local: storeId,
      quantidade: 1,
      valorLiquido: item.precoVenda,
      valorTotal: item.precoVenda,
    };
    if (!checkQuantity(selected)) return;

    setSelectedProduct(selected);
    handleNextStep();
  };

  const calculaValorTotal = (newSelectedProduct: CartProduct) => {
    return Number(
      (newSelectedProduct.quantidade * newSelectedProduct.valorLiquido).toFixed(
        2
      )
    );
  };

  const calculaDesconto = (newSelectedProduct: CartProduct) => {
    const { precoVenda, valorLiquido } = newSelectedProduct;
    if (!precoVenda) return 0;
    const desconto = (1 - valorLiquido / precoVenda) * 100;
    return Number(desconto.toFixed(2));
  };

  const calculaValorLiquido = (newSelectedProduct: CartProduct) => {
    const precoVenda = selectedProduct?.precoVenda || 0;
    const valorLiquido =
      precoVenda - precoVenda * (newSelectedProduct.desconto / 100);
    return Number(valorLiquido.toFixed(2));
  };

  const handleUpdateSelectedProduct = (
    setValue: UseFormSetValue<AddProductSchema>,
    value?: string,
    field?: string
  ) => {
    console.log({ value, field });

    const newSelectedProduct: CartProduct = {
      ...(selectedProduct as CartProduct),
    };
    if (field === "quantidade") {
      const valueNumber = Number(value);
      newSelectedProduct.quantidade = valueNumber;
    } else if (field === "desconto") {
      const valueNumber = Number(value) / 100;
      newSelectedProduct.desconto = valueNumber;
      const valorLiquido = calculaValorLiquido(newSelectedProduct);
      newSelectedProduct.valorLiquido = valorLiquido;
      setValue("valorLiquido", valorLiquido * 100);
    } else if (field === "valorLiquido") {
      const valueNumber = Number(value) / 100;
      newSelectedProduct.valorLiquido = valueNumber;
      const desconto = calculaDesconto(newSelectedProduct);
      newSelectedProduct.desconto = desconto;
      setValue("desconto", desconto * 100);
    }
    const valorTotal = calculaValorTotal(newSelectedProduct);
    newSelectedProduct.valorTotal = valorTotal;
    console.log({ newSelectedProduct });

    setSelectedProduct(newSelectedProduct);
  };

  const checkQuantity = (item: CartProduct): boolean => {
    if (
      Number(configuration) !== Number(selectedSaleType) &&
      Number(item.estoque) < Number(item.quantidade)
    ) {
      showAlert({
        title: "Não é possível adicionar o produto",
        text: "O estoque atual é menor que a quantidade informada",
      });
      return false;
    }
    return true;
  };

  return {
    cartItems,
    selectedProduct,
    handleSelectProduct,
    handleAddItem,
    handleUpdateSelectedProduct,
  };
};
