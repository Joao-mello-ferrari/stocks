import { FiCalendar, FiDollarSign, FiEdit3, 
  FiFileText, FiLayers, FiTag } from 'react-icons/fi';

import './styles.scss'

interface InputProps{
  name: 'name' | 'class' | 'amount' | 'price' | 'total' | 'date';
  label: string;
  type?: string;
}

const icons = {
  name: <FiEdit3/>,
  class: <FiTag/>,
  amount: <FiLayers/>,
  price: <FiDollarSign/>,
  total: <FiFileText/>,
  date: <FiCalendar/>
}

export function Input({ name, label, type="text", }:InputProps){
  return(
    <label className="create-label" htmlFor={name}>
      <input 
        type={type} 
        placeholder={label}
        id={name}
      />
      <div>{icons[name]}</div>
      <span>{label}</span>
    </label>
  )
}