import { Ingridient } from "./IngridientModel"

export interface PizzaModel {
    id: number
    label: string
    name: string
    imgUrl: string
    variant: PizzaVariant[]
    ingridients: Ingridient[]
}

export interface PizzaVariant {
    id: number
    price: number
    size: number
    weight: number
}