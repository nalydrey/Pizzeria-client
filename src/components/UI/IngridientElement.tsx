import chosenIcon from '../../assets/chosen.svg'
import forbidenIcon from '../../assets/forbiden.svg'

interface IngridientElementProps {
    imgUrl: string
    name: string
    price?: number
    union?: string
    disactive?: boolean
    chosen?: boolean
    disable?: boolean
    onClick?: (name: string)=>void
}

export const IngridientElement = ({
    imgUrl,
    name,
    disable = false,
    disactive = false,
    chosen =false,
    price,
    union,
    onClick = ()=>{}
}: IngridientElementProps) => {
  return (
    <div 
        className='group flex flex-col cursor-pointer select-none items-center'
        onClick={()=>{onClick(name)}}
    >
        <div className='relative border rounded-xl w-24 h-24 flex items-center justify-center group-hover:border-orange-400 duration-500'>
            <img src={imgUrl}/>
            {
               (disactive || chosen) &&
                <div className='absolute right-1 top-1 w-5 h-5 rounded-full'>
                    <img src={chosen ? chosenIcon : disactive ? forbidenIcon : '' } className='w-full h-full'/>
                </div>
            }
        </div>
        <h3 className={`${disable ? 'text-gray-400':''} `}>{name}</h3>
        {
            price && 
            <h4 className={`font-medium ${disable ? 'text-gray-400': 'text-orange-600'}`}>{price} {price && union}</h4>
        }
    </div>
  )
}
