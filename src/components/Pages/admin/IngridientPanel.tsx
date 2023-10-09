import {useEffect, useState} from 'react'
import { IngridientCard } from '../../cards/IngridientCard'
import { Ingridient } from '../../../models/IngridientModel'
import { addNewIngridient, deleteIngridient, editIngridient, getAllIngridients, getIngridientTypeList } from '../../../requests/requests'
import { IngridientForm } from '../../forms/IngridientForm'
import { Popup } from '../../UI/Popup'
import { PlusIcon } from '@heroicons/react/24/solid'
import { InfoMessage, InfoMessageProps } from '../../UI/InfoMessage'

export const IngridientPanel = () => {

  const [ingridients, setIngridients] = useState<Ingridient[]>([])
  const [editId, setEdit] = useState<number | null>(null)
  const [types, setTypes] = useState<string[]>([])
  const [isOpenForm, setOpenForm] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string >('')
  const [type, setType] = useState<InfoMessageProps['type'] | undefined>(undefined)

 

  const bootstrap = async() => {
    const data = await getAllIngridients()
    const types = await getIngridientTypeList()
    setTypes(types)
    setIngridients(data);
  }

  const handlerDelete = async (id: number) => {
    const data = await deleteIngridient(id)
    setIngridients(ingridients.filter(ingridient => ingridient.id !== data.id))
    
  }

  const handlerEdit = async (ingridient: Ingridient) => {
    // const {id, name, portionPrice, portionWeight, type, isOption} = ingridient
    // setValues({name, portionPrice, portionWeight, type, isOption})
    // setEdit(id)
  }


  useEffect(()=>{
    bootstrap()
  }, [])



  const submitIngridientForm = async(form: IngridientForm) => {
    setLoading(true)
    try{
      if(!editId){
        const data = await addNewIngridient(form)
        setIngridients([...ingridients, data]);
        setMessage('Ingridient was created')
        setType('success')
        
      }
      else{
        const data = await editIngridient(editId, form)
        setMessage('Ingridient was edited')
        setType('success')
        setIngridients(ingridients.map(ingridient => {
          if(ingridient.id === editId){
            return data
          }
         return ingridient
        }));
        setEdit(null)
      }
    }
    catch(err){
      console.log(err);
      setMessage('Ingridient was not created')
      setType('error')
      
    }
    setLoading(false)
  }

  

 

  return (
    <div>
      <div className='bg-gray-400 p-1 mb-5'>
        <button
          className='flex gap-2 items-center border border-gray-500 rounded-lg px-2 bg-sky-400 hover:bg-sky-500 duration-300'
          onClick={()=>{setOpenForm(true)}}
        >
          <PlusIcon className='w-7 h-7'/>
          <span className='font-medium text-xl'>add new ingridient</span>
        </button>
      </div>
      <Popup
        isOpen = {isOpenForm}
      >
        {
        isOpenForm &&
        <IngridientForm
          className='border border-gray-500 p-7 rounded-lg shadow-2xl bg-gray-300/50'
          isLoading = {isLoading}
          isEdit={!!editId}
          ingridientTypeList={types}
          onSubmit={submitIngridientForm}
          onClose={setOpenForm}
        />
        }
      </Popup>
      
      <div className='flex gap-2 flex-wrap'>
        {ingridients.map(ingridient => {
          return (
            <IngridientCard 
              key = {ingridient.id}
              {...ingridient}
              onEdit={handlerEdit}
              onDelete={handlerDelete}
            />
          )
        })}
      </div>

      <InfoMessage
        message={message}
        type={type}
        onHidden={()=>{setMessage('')}}
      />
    </div>
  )
}
