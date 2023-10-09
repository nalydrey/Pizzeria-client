import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { ReactNode, useEffect, useState, MouseEvent, FocusEvent } from "react"


interface SelectProps {
    title: string
    name: string
    error?: string 
    value: string | number
    children: ReactNode
    onBlur: (e: FocusEvent)=>void
}

export const Select = ({
    error,
    title,
    name,
    value,
    children,
    onBlur
}: SelectProps) => {

    const isError = !!error
    
    const [isOpen, setOpen] = useState<boolean>(false)


    const handleToggle = (e: MouseEvent) => {
        e.stopPropagation()
        setOpen(!isOpen)
    }
    
    const close = () => {
        setOpen(false)
    }

    useEffect(()=>{
        document.addEventListener('click', close)

        return () => {
            document.removeEventListener('click', close)
        }
    },[])

    useEffect(()=>{
        if(value){
            close()
        }
    },[value])


  return (
    <div className="relative max-w-sm w-full">
        <button 
            name={name}
            className={` border-[3px]  bg-white px-3 py-1 rounded-md flex justify-between items-center w-full gap-5 duration-500  
            ${isOpen ? 'border-orange-600': isError ? 'border-red-500':'border-gray-400'}
            
            `}
            onClick={(e)=>handleToggle(e)}
            onBlur={onBlur}
        >
            <span className="text-lg font-medium capitalize">{value ? value : title}</span>
            <div className=" w-6">
                <ChevronDownIcon className={`duration-300 ${isOpen ? ' rotate-180' : ''}`}/>
            </div>
        </button>
        {
        children &&
        <div 
            className={`absolute w-full top-[110%] left-0 overflow-hidden duration-300 ${isOpen ? ' max-h-96':'max-h-0'}`}
            onClick={(e)=>e.stopPropagation()}
        >
            <div className={`bg-white  rounded-md border border-gray-400`}>
                {children}
            </div>
        </div>
        }
    </div>
  )
}
