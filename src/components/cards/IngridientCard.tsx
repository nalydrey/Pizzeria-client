import { Button } from '../UI/Button'
import { Ingridient } from '../../models/IngridientModel'

interface IngridientCardProps {
    id: number
    type: string
    name: string
    portionPrice: number
    onEdit: (ingridient: Ingridient) => void
    onDelete: (id: number) => void
}

export const IngridientCard = ({
id,
type,
name,
portionPrice,
onEdit,
onDelete
}: IngridientCardProps) => {
  return (
    <div className='border border-black rounded-xl p-2'>
        <p>id: {id}</p>
        <p>type: {type}</p>
        <p>name: {name}</p>
        <p>price: {portionPrice}</p>
        <Button label='edit' onClick={()=> onEdit({id, name, type, portionPrice})}/>
        <Button label='delete' onClick={() => onDelete(id)}/>
    </div>
  )
}
