import axios, {  } from "axios";
import { Ingridient } from "../models/IngridientModel";
import { PizzaForm } from "../components/Pages/admin/PizzaForm";
import { PizzaModel } from "../models/PizzaModel";
import { IngridientForm } from "../components/forms/IngridientForm";

export const getAllIngridients = async() => {
    const {data} = await axios.get<{ingridients: Ingridient[]}>('http://localhost:3000/ingridient')
    return data.ingridients
  }

export const addNewIngridient = async(ingridient: IngridientForm) => {
  try{
    const {data} = await axios.post<{ingridient: Ingridient}>('http://localhost:3000/ingridient', ingridient)
    return data.ingridient
  }
  catch(err){
    throw new Error('an error occurred while creating the ingredient')
  }
  }

export const deleteIngridient = async(id: number) => {
  const {data} = await axios.delete<{ingridient: Ingridient}>(`http://localhost:3000/ingridient/${id}`)
  return data.ingridient
}

export const editIngridient = async(id: number, ingridient: IngridientForm) => {
  const {data} = await axios.put<{ingridient: Ingridient}>(`http://localhost:3000/ingridient/${id}`, ingridient)
  return data.ingridient
}

export const createNewPizza = async(pizza: PizzaForm) => {
  const {data} = await axios.post<{pizza: PizzaModel}>('http://localhost:3000/pizza', pizza)
  return data.pizza
}

export const getAllPizza = async() => {
  const {data} = await axios.get<{pizza: PizzaModel[]}>('http://localhost:3000/pizza')
  return data.pizza
}

export const deletePizza = async(id: number | string) => {
  const {data} = await axios.delete<{pizza: PizzaModel}>(`http://localhost:3000/pizza/${id}`)
  return data.pizza
}

export const sendPicture = async(file: FormData) => {
  const {data} = await axios.post<{imgUrl: string}>(`http://localhost:3000/upload/`, file)
  return data.imgUrl
}

export const getIngridientTypeList = async() => {
  const {data} = await axios.get<{types: string[]}>(`http://localhost:3000/ingridient/types`)
  return data.types
}



