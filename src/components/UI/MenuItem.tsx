
interface MenuItemProps {
    title: string | number
    name: string | number
    onClick?: (name: string | number)=>void
}

export const MenuItem = ({
    title,
    name,
    onClick = ()=>{}
}: MenuItemProps) => {
  return (
    <li
        className="px-3 py-1 border border-gray-400 hover:border-orange-500 duration-300 rounded-md hover:shadow-lg cursor-pointer text-lg font-medium"
        onClick={()=>{onClick(name)}}
    >
        {title}
    </li>
  )
}
