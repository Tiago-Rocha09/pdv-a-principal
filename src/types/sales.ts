import { OptionSelectApi } from "./select";

export type SaleType = {
  codTabelaPadrao: number;
  localEstoquePadrao: number;
} & OptionSelectApi;

export class SaleTypeResponse {
  "tiposVenda": SaleType[];
  "tabelasPreco": OptionSelectApi[];
  "locaisEstoque": OptionSelectApi[];
}

export type SaleConfigurationResponse = {
  codTipoVendaDesafio: number;
};
