import { ChangeEvent, HTMLInputTypeAttribute } from "react"


interface InputProps {
    type?: HTMLInputTypeAttribute
    value?: string | number
    name?: string
    error?: string
    placeholder?: string
    onChange?: (e: ChangeEvent) => void
    onBlur?: (e: FocusEvent) => void
}

export const Input = ({
    type = 'text',
    error,
    placeholder,
    value,
    name,
    onChange,
    onBlur
}: InputProps) => {

  const isError = !!error

  return (
    <input 
        className={`border-[3px]  rounded-md px-3 py-1 text-lg font-medium outline-none focus:border-orange-600 duration-500 w-full
                    ${isError ? 'border-red-500':'border-gray-400'}
        `}
        id = {name}
        type={type} 
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
    />
  )
}
