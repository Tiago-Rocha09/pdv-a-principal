import List from '@/components/list';
import { useProduct } from '@/hooks/useProduct';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ItemLocalStock } from './itemLocalStock';
import { Stack } from '@mui/material';
import styles from '../styles.module.scss'
import { Loading } from './laoding';
import { useCart } from '@/hooks/useCart';

type ModalLocalStock = Omit<DialogProps, 'open'>

export function ModalLocalStock(props: ModalLocalStock) {
    const { showModalLocalStock, productStock, isLoading, handleCloseModalLocalStock } = useProduct()
    console.log({ isLoading });

    const handleClose = () => {
        handleCloseModalLocalStock();
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth="lg"
            open={showModalLocalStock}
            onClose={handleClose}
            sx={{
                '& .MuiDialog-paper': {
                    width: 'calc(100% - 20px)',
                    margin: '10px'
                }
            }}
            {...props}
        >
            <DialogTitle>Locais de estoque</DialogTitle>
            <DialogContent
                className={styles.dialogContentContainer}
            >
                <Box>
                    {!isLoading && Array.isArray(productStock?.localEstoque) && (
                        <List.Root>
                            <Stack gap={1}>
                                {
                                    productStock.localEstoque.map((item, index) => {
                                        return <ItemLocalStock key={item.codLocal} item={item} />
                                    })
                                }
                            </Stack>
                        </List.Root>
                    )}
                    {
                        isLoading && <Loading />
                    }
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    );
}
