import React from 'react'


interface Props{
    children: string;
    onClick: () => void;
    color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
}

const Buttons = ({children, onClick, color = "primary"}: Props) => {
  return (
    <button type="button" className={'btn btn-' + color} onClick={onClick}>{children}</button>
    
  )
}

export default Buttons