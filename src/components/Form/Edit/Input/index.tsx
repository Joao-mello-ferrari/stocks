import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FiCalendar, FiDollarSign, FiEdit3, 
  FiFileText, FiLayers, FiTag } from 'react-icons/fi';

import './styles.scss'

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  name: 'name' | 'asset_class' | 'amount' | 'price' | 'total' | 'date';
  label: string;
  defaultValue?: string;
  type?: string | undefined;
}

const icons = {
  name: <FiEdit3/>,
  asset_class: <FiTag/>,
  amount: <FiLayers/>,
  price: <FiDollarSign/>,
  total: <FiFileText/>,
  date: <FiCalendar/>
}

export function Input({ name, label, defaultValue, type="text", ...rest }:InputProps){
  return(
    <label className="edit-input-label" htmlFor={label}>
      <input 
        type={type} 
        placeholder={label}
        defaultValue={defaultValue}
        id={label}
        name={name}
        { ...rest }
      />
      <div>{icons[name]}</div>
      <span>{label}</span>
    </label>
  )
}