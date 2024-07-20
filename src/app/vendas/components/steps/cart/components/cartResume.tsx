import { Container, Grid } from "@mui/material"
import styles from '../styles.module.scss'
import { SimpleInfo } from "@/components/simpleInfo"
import { formatNumber } from "@/utils/mask"
import { CarResumeProps } from "@/hooks/useCart"

type CartResumeProps = {
    resume: CarResumeProps
}
export const CartResume = ({
    resume
}: CartResumeProps) => {
    return <Container className={styles.resumeContainer}>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <SimpleInfo label="Itens:" value={resume.itens} />
            </Grid>
            <Grid item xs={5}>
                <SimpleInfo label="Qtd" value={resume.qtd} />
            </Grid>
            <Grid item xs={4}>
                <SimpleInfo label="Desc.:" value={`${formatNumber(resume.descontoPorcentagem, 'decimal')}%`} />
            </Grid>
            <Grid item xs={3}>
                <SimpleInfo label="Desc.:" value={`${formatNumber(resume.descontoReal, 'currency')}`} vertical />
            </Grid>
            <Grid item xs={5}>
                <SimpleInfo label="V. B.:" value={`${formatNumber(resume.valorBruto, 'currency')}`} vertical />
            </Grid>
            <Grid item xs={4}>
                <SimpleInfo label="V. L.:" value={`${formatNumber(resume.valorLiquido, 'currency')}`} vertical />
            </Grid>
        </Grid>
    </Container>
}