import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'

import { FormControl, FormHelperText } from '@mui/material'
import { Controller, FieldValues, useController, UseControllerProps } from 'react-hook-form'
import styles from './styles.module.scss'
import { Dayjs } from 'dayjs'

type CustomInputProps<T extends FieldValues> = {
  label: string
  hideValidation?: boolean
} & UseControllerProps<T> &
  Omit<DatePickerProps<Dayjs>, 'name' | 'value' | 'onChange'>

export const CustomDatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  hideValidation = false,
  ...rest
}: CustomInputProps<T>) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController<T>({
    control,
    name,
  })

  return (
    <Controller
      name={field.name}
      control={control}
      {...rest}
      render={({ field: fieldSelect }) => (
        <FormControl className={styles.inputGroup} error={invalid}>
          <DatePicker
            {...fieldSelect}
            {...rest}
            onChange={(date: Dayjs | null) => {
              console.log({ date })

              fieldSelect.onChange(date)
            }}
            label={label}
            aria-describedby={`helper-${name}`}
            aria-invalid={invalid ? 'true' : 'false'}
          />
          <FormHelperText error={invalid}>{error?.message || null}</FormHelperText>
        </FormControl>
      )}
    />
  )
}
