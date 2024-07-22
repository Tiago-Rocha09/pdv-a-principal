import { CarResumeProps } from '@/hooks/useCart'
import { CartProduct } from '@/types/product'
import { SaleInstallment } from '@/types/sales'

export const getCartResume = (cartItems: CartProduct[], installments: SaleInstallment[]): CarResumeProps => {
  const resume = cartItems.reduce(
    (acc, curr) => {
      return {
        ...acc,
        itens: acc.itens + 1,
        qtd: acc.qtd + curr.quantidade,
        valorBruto: acc.valorBruto + curr.precoVenda * curr.quantidade,
        valorLiquido: acc.valorLiquido + curr.valorTotal,
      }
    },
    {
      itens: 0,
      qtd: 0,
      valorBruto: 0,
      valorLiquido: 0,
      descontoReal: 0,
      descontoPorcentagem: 0,
      valorRestanteNegociacao: 0,
    },
  )
  resume.valorBruto = Number(resume.valorBruto.toFixed(2))
  resume.valorLiquido = Number(resume.valorLiquido.toFixed(2))

  resume.descontoReal = resume.valorBruto - resume.valorLiquido
  resume.descontoReal = Number(resume.descontoReal.toFixed(2))

  resume.descontoPorcentagem = resume.valorBruto ? (resume.descontoReal / resume.valorBruto) * 100 : 0
  resume.descontoPorcentagem = Number(resume.descontoPorcentagem.toFixed(2))

  const valorParcelasNegociacao = installments.reduce((acc, curr) => {
    return acc + curr.value
  }, 0)

  resume.valorRestanteNegociacao = resume.valorLiquido - valorParcelasNegociacao
  return resume
}
