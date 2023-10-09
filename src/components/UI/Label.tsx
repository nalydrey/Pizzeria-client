import React from 'react'

interface LabelProps {
    text: string
}

export const Label = ({
    text
}: LabelProps) => {
  return (
    <div className='absolute top-7 left-0 bg-red-600 text-xl font-medium rounded-r-lg text-white px-3 py-1'>
        {text}
    </div>
  )
}
