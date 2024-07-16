export type Customer = {
  codCliente: number;
  tipoCliente: string;
  codTipoCliente: number;
  nomeCliente: string;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  fone1: string;
  tipoFone1: number;
  fone2: string;
  tipoFone2: number;
  cpf: string;
  numIdentidade: string;
  obs: string;
  sexo: number;
  dataNascimento: string;
  nomeFantasia: string;
  codFunc: number;
  email: string;
};

export type SelectedCustomer = {
  codCliente: Customer["codCliente"];
  nomeCliente: Customer["nomeCliente"];
  cpf: Customer["cpf"];
  cidade: Customer["cidade"];
  nomeFantasia: Customer["nomeFantasia"];
  active: boolean;
};
