import dayjs from 'dayjs'

export const formatNumber = (
  value: string | number,
  style: keyof Intl.NumberFormatOptionsStyleRegistry,
  customConfiguration?: string,
): string => {
  value = value.toString()

  const numberValue = Number(value)

  let config: Intl.NumberFormatOptions = {
    style,
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
  if (customConfiguration) {
    switch (customConfiguration) {
      case 'number':
        config = {
          style: 'decimal',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }
        break

      default:
        break
    }
  }
  return new Intl.NumberFormat('pt-BR', config).format(numberValue)
}

export const formatDateToPtBr = (dateString?: string) => {
  if (!dateString) return ''
  const formattedDate = dayjs(dateString).format('DD/MM/YYYY')
  return formattedDate
}
