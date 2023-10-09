import { PizzaVariant } from "../../models/PizzaModel"
import defaultPicture from '../../assets/default.png'
import { Button } from "../UI/Button"

interface PizzaCardProps {
    id: number | string
    imgUrl: string
    label: string
    name: string
    ingridients: string[]
    variant: PizzaVariant[]
    onDelete: (id: number | string) => void
    onViewDetail: (id: number | string) => void
}

export const PizzaCard = ({
    id,
    imgUrl,
    ingridients,
    name,
    variant,
    label,
    onDelete,
    onViewDetail
}: PizzaCardProps) => {

    console.log(imgUrl);
    

    const list = ingridients.join(', ')
  return (
    <div className="border border-black p-1">
        <div className="border border-black w-28 h-28">
            <img 
                className=" object-cover w-full h-full"
                src={imgUrl ? imgUrl : defaultPicture} 
            />
        </div>
        <p>{name}</p>
        <p>{list}</p>
        <Button
            label="edit"
        />
        <Button
            label="delete"
            onClick={()=>onDelete(id)}
        />
        <Button
            label="view detail"
            onClick={()=>onViewDetail(id)}
        />
    </div>
  )
}
