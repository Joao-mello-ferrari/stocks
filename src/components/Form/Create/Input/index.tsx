import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FiCalendar, FiDollarSign, FiEdit3, 
  FiFileText, FiLayers, FiTag } from 'react-icons/fi';

import './styles.scss'

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  name: 'name' | 'asset_class' | 'amount' | 'price' | 'total' | 'date';
  label: string;
  type?: string;
}

const icons = {
  name: <FiEdit3/>,
  asset_class: <FiTag/>,
  amount: <FiLayers/>,
  price: <FiDollarSign/>,
  total: <FiFileText/>,
  date: <FiCalendar/>
}

export function Input({ name, label, type="text", ...rest }:InputProps){
  return(
    <label className="create-label">
      <input 
        type={type} 
        placeholder={label}
        // id={}
        // id={label}
        { ...rest }
      />
      <div>{icons[name]}</div>
      <span>{label}</span>
    </label>
  )
}