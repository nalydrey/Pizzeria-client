import { useFormik } from "formik"
import { Ingridient } from "../../../models/IngridientModel"
import { Button } from "../../UI/Button"
import { useEffect, useState, ChangeEvent } from "react"
import { createNewPizza, deletePizza, getAllIngridients, getAllPizza, sendPicture } from "../../../requests/requests"
import { PizzaModel } from "../../../models/PizzaModel"
import { PizzaCard } from "../../cards/PizzaCard"
import { Popup } from "../../UI/Popup"
import { PizzaDetail } from "../../cards/PizzaDetail"
import { Select } from "../../UI/Select"

export interface PizzaForm {
  label: string
  name: string
  imgUrl: string
  variants: PizzaVariantForm[]
  ingridients: number[]
}

interface PizzaVariantForm {
  price: number
  size: number
  weight: number
}

const initialValues: PizzaForm = {
  label: '',
  name: '',
  imgUrl: '',
  variants: [],
  ingridients: []
}

const initialVariant: PizzaVariantForm = {
  price: 0,
  size: 0,
  weight: 0
}

export const PizzaForm = () => {

  const doughVariants = [
    {
      name: 'traditional',
      title: 'Традиційне'
    },
    {
      name: 'thin',
      title: 'Тонке'
    }
]

  const [ingridients, setIngridients] = useState<Ingridient[]>([])
  const [pizza, setPizza] = useState<PizzaModel[]>([])

  const [activePizza, setActivePizza] = useState<PizzaModel | null>(null)


  const {values, handleChange, handleSubmit, setValues, setFieldValue} = useFormik({
    initialValues,
    onSubmit: (form) => {
      createNewPizza(form)
    }
  })


  const bootstrap = async () => {
    const ingridients = await getAllIngridients()
    const pizza = await getAllPizza()
    console.log(pizza);
    
    setPizza(pizza)
    setIngridients(ingridients)
  }

  useEffect(()=>{
    bootstrap()
  }, [])

  const togleIngridient = (id: number) => {
    let newArr: number[] = []
    if(values.ingridients.includes(id)){
      newArr = values.ingridients.filter(ingrId => ingrId !== id)
    }
    else{
      newArr = [...values.ingridients, id]
    }
    setValues({...values, ingridients: newArr})
  }

  const addNewVariantFields = () => {
    setFieldValue('variants', [...values.variants, initialVariant])
  }

  const changeVariant = (index: number, fieldName: string, value: number) => {
    setFieldValue(`variants.${index}.${fieldName}`, value)
  }

  const handlerDelete = async (id: number | string) => {
    await deletePizza(id)
    
  }

  const handlerChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.length){
      console.log(e.target.files[0]);
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      const imgUrl = await sendPicture(formData)
      setFieldValue('imgUrl', imgUrl)
    }
  }
  
  console.log( ingridients );

  const handlerClosePopup = () => {
    setActivePizza(null)
  }
  

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Select
          title='Select'
        >
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </Select>
        <input
          className="border border-black"
          name="label"
          placeholder="label"
          value={values.label}
          onChange={handleChange}
        />
        <input
          className="border border-black"
          name="name"
          placeholder="name"
          value={values.name}
          onChange={handleChange}
        />
        <input
          type='file'
          className="border border-black"
          name="picture"
          onChange={handlerChangeFile}
        />
      </div>

      <div className="flex gap-2">
        {ingridients.map(ingridient => {
          return (
            <div 
              className={`border border-black ${values.ingridients.includes(ingridient.id) ? 'bg-green-400': ''}`}

              onClick = {() => togleIngridient(ingridient.id)}
            >{ingridient.name}</div>
          )
        })}
      </div>

      <div className="flex flex-col gap-2">
        {values.variants.map((variant, index) => {
          return (
            <div>
            
              <input
                className="border border-black"
                name="price"
                placeholder="price"
                value={variant.price}
                onChange={(e) => changeVariant(index, e.target.name, +e.target.value)}
              />
              <input
                className="border border-black"
                name="size"
                placeholder="size"
                value={variant.size}
                onChange={(e) => changeVariant(index, e.target.name, +e.target.value)}
              />
              <input
                className="border border-black"
                name="weight"
                placeholder="weight"
                value={variant.weight}
                onChange={(e) => changeVariant(index, e.target.name, +e.target.value)}
              />
            </div>
          )
        })}
      </div>
        <Button 
          label="Add variant"
          onClick={addNewVariantFields}
        />

      <Button 
        label="send"
        onClick={handleSubmit}
      />

      <div>
        <h2>Container</h2>
        <div className=" flex flex-col gap-3">
          {pizza.map(pizza => (
            <PizzaCard
              {...pizza}
              ingridients={pizza.ingridients.map(ingridient => ingridient.name)}
              onDelete={handlerDelete}
              onViewDetail={()=>{setActivePizza(pizza)}}
            />
          ))}
        </div>
        <Popup
          isOpen = {!!activePizza}
          onClickEmptySpace={handlerClosePopup}
        >
          {
            activePizza &&
            <PizzaDetail
              imgUrl={activePizza.imgUrl}
              label={activePizza.label}
              title={activePizza.name}
              ingridienList={activePizza.ingridients.map(ingridient => ({
                name: ingridient.name,
                type: ingridient.type
              }))}
              doughVariants={doughVariants}
              sizeVariants={activePizza.variant.map(variant => ({
                price: variant.price,
                size: variant.size,
                weight: variant.weight
              }))}
              additionalIngridientList={ingridients.map(ingridient => ({
                name: ingridient.name,
                weight: ingridient.portionWeight,
                price: ingridient.portionPrice,
                type: ingridient.type, 
              }))}
            />
          }
        </Popup>
      </div>
    </div>
  )
}
