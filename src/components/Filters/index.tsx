import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { FiFilter, FiChevronDown } from 'react-icons/fi'

import './styles.scss'

interface FiltersProps{
  customStyles: {},
  onNewRegisterButtonClick: (state: boolean) => void;
  changeFormMethod: (method: 'POST' | 'PUT') => void;
}

interface FilterTypeOption{
  value: string;
  text: string;
}

interface CustomClickEvent extends React.MouseEvent<HTMLLIElement, MouseEvent>{
  target:{
    addEventListener: () => void;
    dispatchEvent: () => boolean; 
    removeEventListener: () => void;
    id: string;
    textContent: string;
  }
}

export function Filters({ 
  customStyles, 
  onNewRegisterButtonClick,
  changeFormMethod 
}: FiltersProps){
  const baseFilterTypeOptions: FilterTypeOption[] = [
    { value: 'name', text: 'Nome do ativo' },
    { value: 'date', text: 'Data da compra / venda' },
    { value: 'value', text: 'Valor' },
    { value: 'amount', text: 'Quantidade' },
    { value: 'classify', text: 'Classificação' },
  ];

  const [filterTypeValue, setFilterTypeValue] = useState('')
  const [filterTypeOptions, setFilterTypeOptions] = useState<FilterTypeOption[]>(baseFilterTypeOptions)
  const [actualFilterType, setActualFilterType] = useState('');
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  
  const filterInputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const ulDropdownRef = useRef() as MutableRefObject<HTMLUListElement>;

  useEffect(()=>{
    window.addEventListener('mousedown',(e)=>{
      const ul = ulDropdownRef.current;
      setIsDropDownOpen((state)=>{
        if(!ul?.contains(e.target as Node) && state) return false
        return state
      });
    })
  },[])

  function handleFilterTypeValueChange(e: React.ChangeEvent<HTMLInputElement>){
    const newFilterTypeValue = e.target.value
    setFilterTypeValue(newFilterTypeValue);
    
    const filteredTypeOptions = baseFilterTypeOptions
      .filter((option)=>{
        console.log(newFilterTypeValue)
        if(!newFilterTypeValue) return true;
        return option.text.toLowerCase()
          .includes(newFilterTypeValue.toLocaleLowerCase())
    });
    setFilterTypeOptions(filteredTypeOptions);
  }

  function handleSelectFilter(e: CustomClickEvent){
    setActualFilterType(e.target.id);
    setFilterTypeValue(e.target.textContent);
    setTimeout(()=>{
      filterInputRef?.current?.focus()
      setIsDropDownOpen(false)
    },100);
  }
  
  

  return(
    <div className="filters-container" style={customStyles}>
      <label htmlFor="input" className="input-container">
        <input 
          className="input" 
          id="input"
          type="text" 
          placeholder='Digite o filtro ...'
          ref={filterInputRef}
        />
        <FiFilter/>
      </label>

      <label htmlFor="select" className="input-container">
        <input 
          className="input" 
          id="select"
          type="text" 
          value={filterTypeValue}
          onChange={handleFilterTypeValueChange}
          onFocus={()=>{ setIsDropDownOpen(true); }}
          placeholder='Escolha o filtro'
        />
        <FiChevronDown/>
        <ul 
          className="input-dropdown" 
          ref={ulDropdownRef}
          style={{ visibility: isDropDownOpen ? 'visible': 'hidden', 
            top: isDropDownOpen ? '2.1rem' : '1rem'
          }}
        >
          { filterTypeOptions.map((option)=>{
            return(
              <li 
                key={option.value} 
                value={option.value}
                id={option.value}
                onClick={handleSelectFilter}
              >
                {option.text}
              </li>
            )
          }) }
        </ul>
      </label>

      <button 
        className="button"
        onClick={()=>{
          onNewRegisterButtonClick(true);
          changeFormMethod('POST');
        }}
      >
        Novo lançamento
      </button>
    </div>
  )
}