import { CheckIcon } from "@heroicons/react/24/solid"

interface CheckboxProps {
    label?: string
    value: boolean
    name: string
    onChange?: (event: {
        name: string,
        value: boolean
    }) => void
}

export const Checkbox = ({
    label,
    name,
    value = false,
    onChange = () => {}
}: CheckboxProps) => {

console.log(value);

  return (
    <button 
        className="flex gap-1"
        onClick={()=>onChange({name, value: !value})}
    >
        <div className='border-[3px] border-gray-400 bg-white rounded-md w-7 h-7'>
            <CheckIcon className={ `stroke-2 stroke-green-600 ${value ? 'scale-100': 'scale-0'} duration-300`}/>
        </div>
        <span className="font-medium text-gray-600">{label}</span>
    </button>
  )
}
