'use client'

import { Box, Step, StepLabel, Stepper } from '@mui/material';
import styles from './styles.module.scss'
import { PageWrapper } from "@/components/pageWrapper";
import { useSale } from '../../hooks/useSale';
import { SearchCustomer } from './components/steps/customerSearch';
import { SelectSaleType } from './components/steps/selectSaleType';
import { Cart } from './components/steps/cart';

const stepLabels = [
    'Dados',
    'Itens',
    'Negociação',
    'Detalhes',
];

const getStepComponent = (activeStep: number) => {
    switch (activeStep) {
        case 0:
            return <SearchCustomer />
            break;
        case 0.5:
            return <SelectSaleType />
            break;
        case 1:
            return <Cart />
            break;

        default:
            return <></>
            break;
    }
}

export default function Sales() {

    const { activeStep } = useSale()

    return (
        <PageWrapper>
            <Box className={styles.container}>
                <Stepper activeStep={Math.floor(activeStep)} alternativeLabel>
                    {stepLabels.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box>
                    {getStepComponent(activeStep)}
                </Box>
            </Box>
        </PageWrapper>
    );
}
