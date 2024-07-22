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
import { FaXmark } from 'react-icons/fa6'
import colors from '@/styles/variables.module.scss'
import Slider, { Settings } from 'react-slick'
import Image from 'next/image'

type ModalImagesProps = Omit<DialogProps, 'open'>

const settings: Settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

export function ModalImages(props: ModalImagesProps) {
  const { productImages, isLoading, showModalImages, handleCloseModalImages } = useProduct()
  console.log({ isLoading })

  const handleClose = (props: any, reason?: 'backdropClick' | 'escapeKeyDown') => {
    console.log({ props, reason })
    if (reason) return
    handleCloseModalImages()
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={showModalImages}
      onClose={handleClose}
      classes={{
        root: styles.backdropModalImages,
        paper: styles.modalImagesPaper,
      }}
      {...props}
    >
      <DialogContent>
        <FaXmark
          color={colors.whiteColor}
          size={30}
          onClick={handleClose}
          style={{
            position: 'fixed',
            top: 10,
            right: 10,
          }}
        />
        <Box>
          {!isLoading && productImages?.length && (
            <Slider {...settings}>
              {productImages.map((item) => (
                <img
                  key={item.codProd}
                  src={item.imagem}
                  alt="Imagem produto"
                />
              ))}
            </Slider>
          )}
          {isLoading && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={250}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.51)',
              }}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}
