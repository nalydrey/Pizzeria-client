import {useEffect, useState} from 'react'
import defaultPicture from '../../assets/default.png'
import { Label } from '../UI/Label'
import { IngridientElement } from '../UI/IngridientElement'
import { setImage } from '../../functions/setImage'
import { ButtonBlock, ButtonElemProps } from '../UI/ButtonBlock'
import { Button } from '../UI/Button'

interface PizzaDetailIngridient {
  imgUrl: string
  name: string
  price?: number
}

interface IngridientData {
  type: string
  name: string
}

interface AdditionalIngridientData extends IngridientData {
  price: number
  weight: number
}

interface DoughData {
  title: string
  name: string
}

interface VariantData {
  size: number
  weight: number
  price: number
}


interface PizzaDetailProps {
  title: string
  imgUrl: string
  label: string
  sizeVariants: VariantData[]
  doughVariants: DoughData[]
  ingridienList: IngridientData[]
  additionalIngridientList: AdditionalIngridientData[]
}



export const PizzaDetail = ({
  title,
  imgUrl,
  label,
  ingridienList,
  additionalIngridientList,
  sizeVariants,
  doughVariants
}: PizzaDetailProps) => {

  const [activeVariant, setActiveVariant] = useState<VariantData | null>(null)
  const [activeDough, setActiveDough] = useState<DoughData | null>(null)
  const [additionalList, setAdditionalList] = useState<string[]>([])
  const [totalValues, setTotalValues] = useState<{price: number, weight: number}>({price: 0, weight: 0})

  useEffect(()=>{
    if(activeVariant){
      const arr = additionalIngridientList.filter(ingridient => additionalList.includes(ingridient.name))

      const totalPrice = activeVariant.price + arr.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)
      const totalWeight = activeVariant.price + arr.reduce((accumulator, currentValue) => accumulator + currentValue.weight, 0)
      
      setTotalValues({...totalValues, price: totalPrice, weight: totalWeight})
    }
    

  }, [additionalList.length, activeVariant?.size])

  const ingridients: PizzaDetailIngridient[] = ingridienList.map(ingridient => (
    {
      imgUrl: setImage(ingridient.type),
      name: ingridient.name
    }
  ))
  
  const additionalIngridients: PizzaDetailIngridient[] = additionalIngridientList.map(ingridient => ({
    imgUrl: setImage(ingridient.type),
    name: ingridient.name,
    price: ingridient.price
  }))

  const variantList: ButtonElemProps[] = sizeVariants.map(variant => (
    {
      isActive: variant.size === activeVariant?.size,
      label: variant.size,
      name: variant.size.toString()
    }
  ))


  const doughButtons: ButtonElemProps[] = doughVariants.map(dough => ({
    isActive: dough.name === activeDough?.name,
    label: dough.title,
    name: dough.name
  }))


  const handleChangeDough = (name: string) => {
   const actDough = doughVariants.find(variant => variant.name === name)
   if(actDough){
     setActiveDough(actDough)
   }
  }

  const handleChangeSize = (name: string) => {
    const activeVar = sizeVariants.find(variant => variant.size === +name)
    if(activeVar){
      setActiveVariant(activeVar)
    }    
  }

  const handleAdditionalClick = (name: string) => {
    console.log(name);
    if(additionalList.includes(name)){
      setAdditionalList(additionalList.filter(ingridient => ingridient !== name))
    }
    else{
      setAdditionalList([...additionalList, name])
    }
  }

  
  return (
    <div className='relative bg-white shadow-xl rounded-2xl p-3 flex gap-5 items-center duration-1000'>
      <div className=' overflow-hidden rounded-lg max-w-lg'>
        <img src={imgUrl ? imgUrl : defaultPicture}/>
      </div>
      <div className='flex flex-col gap-5'>
        <h2 className='text-3xl font-bold'>{title}</h2>
        {
          label && 
          <Label text={label}/>
        }
        <div className='flex gap-3'>
          {
            ingridients.map(ingridient => (
              <IngridientElement 
                {...ingridient}
                union='грн' 
              />
            ))
          }
        </div>
          <ButtonBlock
            buttonList={doughButtons}
            onClick={handleChangeDough}            
          />
          <ButtonBlock
            buttonList={variantList}
            onClick={handleChangeSize}            
          />
        <h3 className='font-bold text-lg'>Додати то піци</h3>
        <div className='flex gap-3'>
          {
            additionalIngridients.map(ingridient => (
              <IngridientElement 
                {...ingridient}
                chosen={additionalList.includes(ingridient.name)}
                union='грн'
                onClick={handleAdditionalClick}
              />
            ))
          }
        </div>
        <div className='flex justify-between gap-10'>
          {
            activeVariant && activeDough ?
            <>
              <div className='flex gap-2 items-center'>
                <span className='text-orange-600 font-medium text-xl'>Всього: {totalValues.price} грн</span>
                <span className='text-gray-400 font-medium text-lg'>{totalValues.weight} г</span>
              </div>
              <Button
                label='Додати'
                onClick={()=>{}}
              />
            </>
            :
            <p className='text-2xl font-bold text-red-600 animate-bounce'>Оберіть розмір та тісто</p>

          }
        </div>
      </div>
    </div>
  )
}
