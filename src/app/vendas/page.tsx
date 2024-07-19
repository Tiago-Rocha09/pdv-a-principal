'use client'

import { Box, Step, StepLabel, Stepper } from '@mui/material';
import styles from './styles.module.scss'
import { PageWrapper } from "@/components/pageWrapper";
import { useSale } from '../../hooks/useSale';
import { SelectSaleType } from './components/steps/selectSaleType';
import { Cart } from './components/steps/cart';
import { SearchCustomerStep } from './components/steps/customerSearchStep';
import { ProductSearchStep } from './components/steps/productSearchStep';
import { AddProduct } from './components/steps/addProduct';
import { ToastContainer } from 'react-toastify';

const stepLabels = [
    'Dados',
    'Itens',
    'Negociação',
    'Detalhes',
];

const getStepComponent = (activeStep: number) => {

    switch (activeStep) {
        case 0:
            return <SearchCustomerStep />
            break;
        case 0.5:
            return <SelectSaleType key={activeStep.toString()} />
            break;
        case 1:
            return <Cart />
            break;

        case 1.1:
            return <ProductSearchStep />
            break;

        case 1.2:
            return <AddProduct />
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

            <ToastContainer />
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
