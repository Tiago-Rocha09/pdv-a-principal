import { OptionSelectApi } from './select'

export type SaleType = {
  codTabelaPadrao: number
  localEstoquePadrao: number
} & OptionSelectApi

export class SaleTypeResponse {
  'tiposVenda': SaleType[]
  'tabelasPreco': OptionSelectApi[]
  'locaisEstoque': OptionSelectApi[]
}

export type SaleConfigurationResponse = {
  codTipoVendaDesafio: number
}

export type SaleInstallment = {
  number: number
  value: number
  dueDate: string
  paymentMethod: number
}
