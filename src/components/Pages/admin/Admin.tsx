import { Button } from '../../UI/Button'
import { Outlet, useNavigate } from 'react-router-dom'

export const Admin = () => {

    const navigate = useNavigate()


  return (
    <div className='container mx-auto '>
        <h1 className='text-center text-3xl font-bold'>Admin</h1>
        <div className='flex gap-5 '>
            <div className='border border-black p-2 flex flex-col gap-2'>
                <Button 
                    label='Create Ingridient'
                    onClick={()=>{navigate('ingridient')}}
                />
                <Button 
                    label='Create Pizza'
                    onClick={()=>{navigate('pizza')}}
                />
            </div>
            <div className='border border-black grow'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}
