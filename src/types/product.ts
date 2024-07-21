export type Product = {
  codProd: string;
  descricao: string;
  precoVenda: number;
  estoque: number;
  estoqueTotal: number;
  descontoMaximoPromocao: number;
  imagem: string;
  precoPromocao: number;
  descontoMaximo: number;
  textoPromocao: string;
  textoValorVenda: string;
};

export type CartProduct = {
  desconto: number;
  quantidade: number;
  valorLiquido: number;
  valorTotal: number;
  local: number;
} & Product;

type ProductStockResponseApi = {
  CodLocal: number;
  NomeLocal: string;
  Estoque: number;
};

type ProductTabPriceResponseApi = {
  NomeTabela: string;
  PrecoVenda: number;
  TextoValorVenda: string;
};

export type FindProductResponseApi = {
  localEstoque: ProductStockResponseApi[];
  tabelaPreco: ProductTabPriceResponseApi[];
};

export type ProductStockItem = {
  codLocal: number;
  nomeLocal: string;
  estoque: number;
};

type ProductTabPriceItem = {
  nomeTabela: string;
  precoVenda: number;
  textoValorVenda: string;
};

export type ProductStock = {
  localEstoque: ProductStockItem[];
  tabelaPreco: ProductTabPriceItem[];
};
