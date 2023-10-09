import { MouseEvent } from "react"

interface ButtonProps {
    type?: "button" | "submit" | "reset"
    label: string
    onClick?: (e: MouseEvent) => void
}

export const Button = ({
    type,
    label,
    onClick = ()=>{}
}:ButtonProps) => {
  return (
    <button 
      type={type}
      className={`px-5 py-2 rounded-lg border border-orange-500 hover:bg-orange-400 hover:text-white active:bg-orange-500 duration-200 select-none`}
      onClick = {(e)=>onClick(e)}
  >
      {label}
    </button>
  )
}
