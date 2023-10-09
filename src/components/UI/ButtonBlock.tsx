
interface ButtonBlockProps {
    buttonList: ButtonElemProps[]
    onClick?: (name: string ) => void
}

export interface ButtonElemProps {
    name: string 
    label: string | number
    isActive?: boolean
}

export const ButtonBlock = ({
    buttonList,
    onClick = () => {}
}: ButtonBlockProps) => {


    
  return (
    <div className='border border-gray-200 rounded-lg flex w-full'>
        {
            buttonList.map(({label, name, isActive}) => (
                <button 
                    className={`w-full px-3 py-2 rounded-lg border border-transparent hover:border-orange-500 duration-200 select-none
                    ${isActive ? ' bg-orange-500 text-white' : ''}`}
                    name={name}
                    onClick = {()=>onClick(name)}
                >
                    {label}
                </button>
            ))
        }
    </div>
  )
}
