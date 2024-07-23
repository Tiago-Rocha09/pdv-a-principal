'use client'
import { Card, CardContent, Container } from '@mui/material'
import Image from 'next/image'
import logo from '@/images/logo.png'
import { LoginSchema, loginSchema } from './login.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomInput } from '@/components/input'
import { CustomButton } from '@/components/button'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import { Select } from '@/components/select'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

export default function Login() {
  const {
    control,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })
  const { getBasesAvailable, bases, stores, getBaseStores, login, isLoading } = useAuth()

  const watchBase = watch('base')
  const watchStore = watch('store')

  const onSubmit = (data: LoginSchema) => {
    login(data)
  }

  useEffect(() => {
    getBasesAvailable()
  }, [getBasesAvailable])

  return (
    <Container className={styles.container}>
      <Card className={styles.card}>
        <CardContent className={styles.content}>
          <hgroup>
            <Image src={logo} alt="Logo A Principal" width={120} />
            <p className="italic text-sm text-center text-black">Faça login utilizando seu usuário do RAD</p>
          </hgroup>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Select
              label="Base"
              name="base"
              control={control}
              options={bases}
              onChange={(value) => getBaseStores(Number(value))}
            />
            {!!watchBase && (
              <>
                <Select label="Loja" name="store" control={control} options={stores} />
                {!!watchStore && (
                  <>
                    <CustomInput label="Usuário" name="user" control={control} />
                    <CustomInput label="Senha" name="password" control={control} type="password" />
                  </>
                )}
              </>
            )}
            <CustomButton
              text="Entrar"
              type="submit"
              disabled={!watchBase || !watchStore}
              isLoading={isLoading}
              width="24rem"
            />
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}
