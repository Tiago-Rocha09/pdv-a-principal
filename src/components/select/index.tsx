import { OptionSelect } from "@/types/select"
import { Controller, FieldValues, useController, UseControllerProps } from "react-hook-form"
import ReactSelect from "react-select"
import styles from './styles.module.scss'
import { FormLabel } from "@mui/material"

type InputProps<T extends FieldValues> = {
    label: string,
    options: OptionSelect[]
    placeholder?: string,
    onChange?: (value: string | number) => void
} & UseControllerProps<T>

export const Select = <T extends FieldValues>({ control, name, label, options, placeholder = "Selecione...", onChange = () => { }, ...rest }: InputProps<T>) => {
    const { field, fieldState: { invalid, error } } = useController<T>({
        control,
        name
    })

    return <Controller
        name={field.name}
        control={control}
        {...rest}
        render={({ field: fieldSelect }) => (
            <fieldset className={styles.containerInput}>
                {label && <FormLabel className={styles.label}>{label}</FormLabel>}
                <ReactSelect
                    {...fieldSelect}
                    value={options.find(item => item.value === fieldSelect.value)}
                    onChange={(value) => {
                        fieldSelect.onChange(value?.value)
                        onChange(value?.value || '')
                    }}
                    placeholder={placeholder}
                    options={options}
                    menuPortalTarget={document.body}
                    classNames={{
                        control: () =>
                            invalid ? styles.borderError : '',
                        placeholder: () =>
                            invalid ? styles.borderError : '',
                    }}
                    styles={{
                        control: (baseStyles) => ({
                            ...baseStyles,
                            height: 56,
                        }),
                    }}
                />
                {error && <p role="alert">{error.message}</p>}
            </fieldset>
        )}
    />
}