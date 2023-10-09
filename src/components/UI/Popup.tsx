import {ReactNode, useState, MouseEvent} from 'react'

interface PopupProps {
    children: ReactNode
    isOpen: boolean
    onClickEmptySpace?: () => void
}

export const Popup = ({
    children,
    isOpen = false,
    onClickEmptySpace = () => {}
}: PopupProps) => {


    const handlerClick = (e: MouseEvent) => {
        e.stopPropagation()
    }

  return (
    <div
        className={`absolute top-0 left-0 w-screen h-screen bg-slate-700/50 backdrop-blur justify-center items-center duration-300
                    ${isOpen ? 'flex':'hidden'}
        `}
        onClick={onClickEmptySpace}

    >
        <div onClick={handlerClick}>
            {children}
        </div>
    </div>
  )
}
