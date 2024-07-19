import { FormControl, TextField, TextFieldProps } from "@mui/material"
import { Controller, FieldValues, useController, UseControllerProps } from "react-hook-form"
import styles from './styles.module.scss'

type CustomInputProps<T extends FieldValues> = {
    label: string
    hideValidation?: boolean
} & UseControllerProps<T>
    & TextFieldProps

export const CustomInput = <T extends FieldValues>({ control, name, label, hideValidation = false, ...rest }: CustomInputProps<T>) => {
    const { field, fieldState: { invalid, error } } = useController<T>({
        control,
        name
    })

    return <Controller
        name={field.name}
        control={control}
        {...rest}
        render={({ field: fieldSelect }) => (
            <FormControl className={styles.inputGroup}>
                <TextField
                    {...fieldSelect}
                    {...rest}
                    label={label}
                    aria-describedby={`helper-${name}`}
                    aria-invalid={invalid ? 'true' : 'false'}
                    helperText={!hideValidation ? error?.message : null}
                    error={invalid && !hideValidation}
                />
            </FormControl>
        )}
    />

}