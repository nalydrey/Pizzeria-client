import React, { useEffect, useState } from 'react'

const changeColor = (type: InfoMessageProps['type']) => {
    switch(type){
        case 'error': return 'bg-red-700/70'
        case 'info': return 'bg-blue-600/70'
        case 'success': return 'bg-green-600/70'
        case 'warning': return 'bg-orange-600/70'
        default: return 'bg-white'
    } 
}

export interface InfoMessageProps {
    type?: 'warning' | 'error' | 'success' | 'info'
    message: string 
    onHidden: ()=>void
}

export const InfoMessage = ({
    type,
    message,
    onHidden
}: InfoMessageProps) => {

    const [isShow, setShow] = useState<boolean>(false)
   
    useEffect(()=>{
        if(message){
            setShow(true)
            const timer = setTimeout(()=>{
                setShow(false)
            }, 4000)
        }
        else{
            setShow(false)
        }
    },[message])

    const handleEndTransition = () => {
        if(!isShow){
            onHidden()
        }
        
    }

  return (
    <div 
        className={`${changeColor(type)} ${isShow ? 'top-2':'-top-20'} absolute duration-300 border border-black  left-1/2 -translate-x-1/2 px-3 py-2 text-2xl 
        font-medium rounded-lg shadow-xl max-w-xl backdrop-blur-sm
        `}
        onTransitionEnd={handleEndTransition}
    >{message}</div>
  )
}
