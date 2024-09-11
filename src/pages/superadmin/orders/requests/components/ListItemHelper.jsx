import React from 'react'

export default function ListItemHelper({
    icon,
    text
}) {
  return (
    <div className="flex items-center gap-[12px] space-x-2 rtl:space-x-reverse">
        <div className="visit__helper--icon">
            {icon}
        </div>
    <p className="visit__helper--font">{text}</p>
  </div>  )
}
