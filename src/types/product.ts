export type Product = {
  codProd: number;
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
  local: number
} & Product;
