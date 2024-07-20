import { FormControl, TextField, TextFieldProps } from "@mui/material"
import { Controller, FieldValues, useController, UseControllerProps } from "react-hook-form"
import styles from './styles.module.scss'
import { formatNumber } from "@/utils/mask"
import { toast } from "react-toastify"

type CustomInputProps<T extends FieldValues> = {
    label: string
    hideValidation?: boolean
    inputStyle?: keyof Intl.NumberFormatOptionsStyleRegistry
    max?: number
    min?: number
    maskType?: string
    customOnChange?: (value?: number, field?: string) => void
} & UseControllerProps<T>
    & TextFieldProps

const formatToCurrency = (value: string, style: keyof Intl.NumberFormatOptionsStyleRegistry, maskType?: string): string => {
    value = value.toString()
    const numberValue = Number(value.replace(/[^0-9]/g, '')) / 100;

    return formatNumber(numberValue, style, maskType);
}

const parseCurrencyValue = (value: string): string => {
    value = value.toString()
    return value.replace(/[^0-9]/g, '');
}

export const CurrencyInput = <T extends FieldValues>({ control, name, label, hideValidation = false, inputStyle = "currency", max, min, maskType, customOnChange = () => { }, ...rest }: CustomInputProps<T>) => {
    const { field, fieldState: { invalid, error } } = useController<T>({
        control,
        name
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = Number(parseCurrencyValue(event.target.value));
        if (max && (rawValue / 100) > max) {
            toast.error(`O valor máximo permitido é ${formatNumber(max, 'currency')}`)
            return
        }
        if (min && (rawValue / 100) < min) {
            toast.error(`O valor mínimo permitido é ${formatNumber(min, 'currency')}`)
            return
        }
        field.onChange(rawValue);
        customOnChange(rawValue, field.name)
    }

    const formattedValue = formatToCurrency(field.value || '', inputStyle, maskType);

    return <Controller
        name={field.name}
        control={control}
        {...rest}
        render={({ field: fieldSelect }) => (
            <FormControl className={styles.inputGroup}>
                <TextField
                    {...fieldSelect}
                    {...rest}
                    value={formattedValue}
                    onChange={handleChange}
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