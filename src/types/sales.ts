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

type SavePurchaseProduct = {
  codProd: string
  localEstoque: number
  quantidade: number
  precoVenda: number
  valorTotal: number
  desconto: number
  textoPromocao: string
}

type SavePurchaseInstallment = {
  vencimento: string
  valor: number
  formaPagamento: number
}

export type SavePurchase = {
  codLoja: number
  codCliente: number
  nomeCliente: string
  valorBruto: number
  valorLiquido: number
  codTipoEntrega: number
  codTipoStatus: number
  observacao: string | null
  produtos: SavePurchaseProduct[]
  parcelas: SavePurchaseInstallment[]
  tipoVenda: number
  tabPreco: number
  localEstoque: number
}
