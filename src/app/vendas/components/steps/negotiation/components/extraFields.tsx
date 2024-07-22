import { CartProduct } from '@/types/product'
import { Grid, Stack } from '@mui/material'
import { Label } from '@/components/label'
import { formatDateToPtBr, formatNumber } from '@/utils/mask'
import { SaleInstallment } from '@/types/sales'

export const extraFields = (item: SaleInstallment) => {
  return (
    <Grid container sx={{ marginTop: '0.5rem' }}>
      <Grid item xs={12}>
        <Label text={`Nº parcela: ${item.number}`} />
      </Grid>
      <Grid
        item
        xs={8}
        sx={{
          fontSize: '0.9rem',
        }}
      >
        <Label text="Vencimento: " />
        {formatDateToPtBr(item?.dueDate)}
      </Grid>
      <Grid item xs={4} textAlign="right">
        <Label text={formatNumber(item?.value, 'currency')} />
      </Grid>
    </Grid>
  )
}
