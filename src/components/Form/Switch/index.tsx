import { DetailedHTMLProps, Dispatch, InputHTMLAttributes, SetStateAction, useState } from 'react';
import './styles.scss'

interface SwitchProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  name: 'action_type'
  label: string;
  changeValue: () => void;
  defaultValue?: number;
  isOnRight: boolean;
  displayedValue: string;
}

export function Switch({ 
  name, 
  label, 
  changeValue, 
  isOnRight, 
  displayedValue, 
  ...rest
}: SwitchProps){

  return(
    <label className="edit-range-label">
      <input 
        type="text" 
        name={name}
        onClick={changeValue}
        onChange={()=>{}}
        { ...rest }
      />
      <div 
        className="dot"
        style={{ left: isOnRight ? '68%' : ''}}
      />
      <span className="label">
        {label} 
        <span className="value">{ displayedValue }</span>
      </span>
    </label>
  )
}