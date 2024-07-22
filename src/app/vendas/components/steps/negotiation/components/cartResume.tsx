import { Container, Grid } from '@mui/material'
import styles from '../styles.module.scss'
import { SimpleInfo } from '@/components/simpleInfo'
import { formatNumber } from '@/utils/mask'
import { CarResumeProps } from '@/hooks/useCart'

type CartResumeProps = {
  resume: CarResumeProps
}
export const CartResume = ({ resume }: CartResumeProps) => {
  return (
    <Container className={styles.resumeContainer}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <SimpleInfo
            label="Total produtos"
            value={`${formatNumber(resume.valorBruto, 'currency')}`}
            vertical
          />
        </Grid>
        <Grid item xs={4}>
          <SimpleInfo label="Desconto" value={`${formatNumber(resume.descontoReal, 'currency')}`} vertical />
        </Grid>
        <Grid item xs={4}>
          <SimpleInfo
            label="Total líquido"
            value={`${formatNumber(resume.valorLiquido, 'currency')}`}
            vertical
          />
        </Grid>
      </Grid>
    </Container>
  )
}
