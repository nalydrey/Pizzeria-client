import { Select } from '../UI/Select'
import { Input } from '../UI/Input'
import { Checkbox } from '../UI/Checkbox'
import { Button } from '../UI/Button'
import { useFormik } from 'formik'
import { MenuItem } from '../UI/MenuItem'
import preloader from '../../assets/Spinner-1s-197px.svg'
import { useEffect, useState } from 'react'
import {object, string, number} from 'yup'

export interface IngridientForm {
    type: string,
    name: string,
    portionPrice: number | ''
    portionWeight: number | ''
    isOption: boolean
  }

  interface IngridientFormProps {
    className?: string
    isLoading?: boolean
    preloaderPause?: number
    ingridientTypeList: string[]
    isEdit: boolean
    onSubmit?: (form: IngridientForm) => void
    onClose?: (value:boolean) => void
  }

  interface CustomEvent {
    name: string
    value: number | string | boolean
  }

  const initialValues: IngridientForm = {
    type: '',
    name: '',
    portionPrice: '',
    portionWeight: '',
    isOption: false
  }

  const validationSchema = object({
    type: string().required('field must be fill'),
    name: string().required('field must be fill'),
    portionPrice: number().required('the mumber must be fill').positive('the mumber must be positive'),
    portionWeight: number().required('the mumber must be fill').positive('the mumber must be positive'),

  })

export const IngridientForm = ({
    className,
    ingridientTypeList,
    preloaderPause = 500,
    isLoading,
    isEdit,
    onSubmit = () => {},
    onClose = () => {}
}: IngridientFormProps) => {

    const {values, errors, touched, setTouched, handleBlur, setFieldValue, handleChange, handleSubmit, setValues} = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (form) => {
            onSubmit(form)
        } 
      })

      const [actualTimer, setActualTimer] = useState<NodeJS.Timeout | null>(null)
      const [loadingStatus, setLoading] = useState<boolean>(false)

    useEffect(()=>{
      let timer: NodeJS.Timeout 
      if(isLoading && !loadingStatus){
        setLoading(true)
        timer = setTimeout(()=>{
          clearTimeout(timer)
          setActualTimer(null)
        }, preloaderPause)
        setActualTimer(timer)
      }
     
      if(!actualTimer && !isLoading){
        setLoading(false)
      }

    },[isLoading, actualTimer])


    const handlerChange = (event: CustomEvent) => {
        setFieldValue(event.name, event.value)
    }

    const handleClose = () => {
        setValues(initialValues)
        onClose(false)
    }
    
    console.log(touched);
    

  return (
    <div className={`relative ${className} flex flex-col gap-2 items-center max-w-sm`}>
        <button 
            className='absolute border top-1 right-1 w-8 h-8 rounded-full hover:border-red-500 duration-300'
            onClick={handleClose}
        >
            <div className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-1 rotate-45 rounded-sm bg-red-500'></div>
            <div className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-1 -rotate-45 rounded-sm bg-red-500'></div>
        </button>
        <h2 className='font-bold text-2xl mb-3 text-gray-700'>{isEdit ? 'Editing ingridient':'Creating ingridient'}</h2>
        <Select
          title='type'
          name = 'type'
          error={touched.type ? errors.type : ''}
          value={values.type}
          onBlur={handleBlur}
        >
          <ul className='flex flex-col p-1 gap-1'>
            {
              ingridientTypeList.map(type => (
               <MenuItem
                  key={type}
                  title={type}
                  name={type}
                  onClick={(value) => handlerChange({name: 'type', value})}
               />
              ))
            }
          </ul>
        </Select>
        <Input
          value={values.name}
          name='name'
          error={touched.name ? errors.name: ''}
          placeholder='ingridient name'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          type='number'
          name = 'portionPrice'
          error={touched.portionPrice ? errors.portionPrice : ''}
          value={values.portionPrice}
          placeholder='portion price'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          type='number'
          name='portionWeight'
          error={touched.portionWeight ? errors.portionWeight : ''}
          value={values.portionWeight}
          placeholder='portion weight'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Checkbox
          label='option'
          name='isOption'
          value={values.isOption}
          onChange={handlerChange}
        />
        <Button
          type='button'
          label={isEdit ? 'Edit' : 'Save' }
          onClick={()=>handleSubmit()}
        />
        {
            loadingStatus &&
            <div className='absolute w-full h-full top-0 bg-gray-500/60 backdrop-blur-sm flex justify-center items-center'>
                <div className='w-12 h-12'>
                    <img src={preloader}/>
                </div>
            </div>
        }
      </div>
  )
}
