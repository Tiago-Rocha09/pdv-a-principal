import List from '@/components/list'
import { useProduct } from '@/hooks/useProduct'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { ItemLocalStock } from './itemLocalStock'
import { Skeleton, Stack } from '@mui/material'
import styles from '../styles.module.scss'

type ModalLocalStockProps = Omit<DialogProps, 'open'>

export function ModalLocalStock(props: ModalLocalStockProps) {
  const { showModalLocalStock, productStock, isLoading, handleCloseModalLocalStock } = useProduct()
  console.log({ isLoading })

  const handleClose = () => {
    handleCloseModalLocalStock()
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={showModalLocalStock}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': {
          width: 'calc(100% - 20px)',
          margin: '10px',
        },
      }}
      {...props}
    >
      <DialogTitle>Locais de estoque</DialogTitle>
      <DialogContent className={styles.dialogContentContainer}>
        <Box>
          {!isLoading && Array.isArray(productStock?.localEstoque) && (
            <List.Root>
              <Stack gap={1}>
                {productStock.localEstoque.map((item, index) => {
                  return <ItemLocalStock key={item.codLocal} item={item} />
                })}
              </Stack>
            </List.Root>
          )}
          {isLoading && (
            <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
              {Array(13)
                .fill(true)
                .map((item, index) => (
                  <Skeleton key={index} variant="rectangular" width="100%" height={40} />
                ))}
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  )
}
