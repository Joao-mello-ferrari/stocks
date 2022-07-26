import { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';
import './styles.scss'

interface SwitchProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  name: 'action_type'
  label: string;
  values: [string, string];
  keyValues: [string, string];
  defaultValue?: number;
}

export function Switch({ name, label, values, keyValues, defaultValue, ...rest }: SwitchProps){
  const [value, setValue] = useState(()=>{
    if(defaultValue !== undefined) return defaultValue
    return 0;
  });

  function handleClick(){
    setValue(Number(!value));
  }

  return(
    <label className="edit-range-label">
      <input 
        type="text" 
        name={name}
        value={Number(value) === 0 ? keyValues[0] : keyValues[1] }
        onClick={handleClick}
        onChange={()=>{}}
        { ...rest }
      />
      <div 
        className="dot"
        style={{ left: value ? '68%' : ''}}
      />
      <span className="label">
        {label} 
        <span className="value">{ values[Number(value)] }</span>
      </span>
    </label>
  )
}