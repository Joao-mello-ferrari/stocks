import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { FiFilter, FiChevronDown } from 'react-icons/fi'

import { useQuery } from 'react-query';
import { loadRegisters } from '../../api/loadRegisters';

import { useRegisters } from '../../contexts/registersContext';
import { useToast } from '../../contexts/toastContext';
import { useAuth  } from '../../contexts/authContext';

import { compareDates, isoDateFromInput } from '../../helpers/dateConversion';
import { compareNumbers, formatCurrencyInput, formatNumber, getRawCurVal, getRawNumberVal } from '../../helpers/numbersFormatters';
import { utf8ToAscii } from '../../helpers/textFormatter';

import { FilterTypeOption, CustomClickEvent, CustomClickEventOperand,
  FiltersProps, Operand } from './FiltersInterface';
  
import './styles.scss'

const baseFilterTypeOptions: FilterTypeOption[] = [
  { value: 'asset_class', text: 'Classificação' },
  { value: 'name', text: 'Nome do ativo' },
  { value: 'amount', text: 'Quantidade' },
  { value: 'price', text: 'Valor' },
  { value: 'date', text: 'Data' },
];

const operands: Operand[] = [
  { value: 0, icon: '=' },
  { value: -1, icon: '<' },
  { value: 1, icon: '>' }
]

export function Filters({  changeFormMethod }: FiltersProps){
    const { user } = useAuth();

    const { data: allRegisters } = useQuery(
    'loadRegisters', 
    async () => await loadRegisters(user?.email), 
    { staleTime: Infinity }
  );

  const [filterValue, setFilterValue] = useState('');
  const [filterTypeValue, setFilterTypeValue] = useState('Nome do ativo');
  const [filterTypeOptions, setFilterTypeOptions] = useState<FilterTypeOption[]>(baseFilterTypeOptions)
  const [filterTypeKey, setFilterTypeKey] = useState<'asset_class' | 'name' | 'amount' | 'price' | 'date' | ''>('name');
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const [operand, setOperand] = useState(0);
  const [isOperandDropDownOpen, setIsOperandDropDownOpen] = useState(false);

  const [isWarningToastEnabled, setIsWarningToastEnabled] = useState(true);
  const [overflow, setOverflow] = useState('overflow');

  const { storeFilteredRegisters, storeModalState } = useRegisters();
  const { addToast } = useToast();

  const filterInputRef = useRef() as MutableRefObject<HTMLLabelElement>;
  const filterTypeInputRef = useRef() as MutableRefObject<HTMLLabelElement>;
  const operandInputRef = useRef() as MutableRefObject<HTMLLabelElement>;


  useEffect(()=>{
    window.addEventListener('mousedown',(e)=>{
      const filterTypeLabel = filterTypeInputRef.current;
      const operandLabel = operandInputRef.current;
      
      setIsDropDownOpen((state)=>{
        if(!filterTypeLabel?.contains(e.target as Node) && state) return false
        return state;
      });
      setIsOperandDropDownOpen((state)=>{
        if(!operandLabel?.contains(e.target as Node) && state) return false
        return state
      });
    })
  },[]);

  useEffect(()=>{
    const shouldShowOperands = showOperands();
    if(shouldShowOperands) setTimeout(()=>{ setOverflow('') }, 400);
    else setOverflow('overflow');
  },[filterTypeKey]);

  function handleFilterTypeValueChange(e: React.ChangeEvent<HTMLInputElement>){
    const newFilterTypeValue = e.target.value;
    setFilterTypeValue(newFilterTypeValue);
    
    const filteredTypeOptions = baseFilterTypeOptions
      .filter((option)=>{
        if(!newFilterTypeValue) return true;
        return option.text.toLowerCase()
          .includes(newFilterTypeValue.toLocaleLowerCase())
    });
    setFilterTypeOptions(filteredTypeOptions);
  }

  function handleSelectFilter(e: CustomClickEvent){
    setFilterTypeKey(e.target.id);
    setFilterTypeValue(e.target.textContent);
    setFilterValue('');
    storeFilteredRegisters(allRegisters ? allRegisters : []);
    setTimeout(()=>{
      filterInputRef?.current?.focus()
      setIsDropDownOpen(false)
    },100);
    setTimeout(()=>{ setFilterTypeOptions(baseFilterTypeOptions); },250);
  }

  function handleSelectOperand(e: CustomClickEventOperand){
    setOperand(e.target.value);
    filterTable(null, e.target.value);
    setTimeout(()=>{
      filterInputRef?.current?.focus()
      setIsOperandDropDownOpen(false)
    },100);
  }
  
  function filterTable(e: React.ChangeEvent<HTMLInputElement> | null, oper=operand): any{
    if(allRegisters === undefined) return;
    let searchVal = null;

    if(e === null) searchVal = filterValue;
    else{
      if(e.target.value === '' || e.target.value === 'R$ 0,0'){
        setFilterValue('');
        storeFilteredRegisters(allRegisters);
        return
      } else searchVal = e.target.value
    }; 

    if(filterTypeKey === ''){
      if(isWarningToastEnabled){
        setIsWarningToastEnabled(false);
        addToast({ 
          type: 'warning', 
          title: 'Filtragem', 
          message: 'Selecione um tipo de filtro!' 
        });
        setTimeout(()=>{ setIsWarningToastEnabled(true); },4000);
      }
      return;
    };
    if(!searchVal){
      setFilterValue(searchVal);
      storeFilteredRegisters(allRegisters);
      return;
    }
    
    let basedSearchVal:string, newInputValue:string;
    switch(filterTypeKey){
      case 'price':
        let auxPriceVal = searchVal;
        if(!(/^[0-9]+$/.test(searchVal[searchVal.length-1]))){
          auxPriceVal = searchVal.slice(0,searchVal.length-1);
        }
        basedSearchVal = getRawCurVal(auxPriceVal);
        newInputValue = formatCurrencyInput(auxPriceVal);
        break;
      case 'amount':
        let auxAmountVal = searchVal;
        if(!(/^[0-9]+$/.test(searchVal[searchVal.length-1]))){
          auxAmountVal = searchVal.slice(0,searchVal.length-1);
        }
        basedSearchVal = getRawNumberVal(auxAmountVal);
        newInputValue = formatNumber(auxAmountVal);
        break;
      case 'date':
        basedSearchVal = isoDateFromInput(searchVal);
        newInputValue = searchVal;
        break;   
      default:
        basedSearchVal = utf8ToAscii(searchVal).toLocaleLowerCase();
        newInputValue = searchVal;
        break;
    }
    
    const newFilteredRegs = allRegisters.filter((reg)=>{
      switch(filterTypeKey){
        case 'price': return compareNumbers(reg.price, +basedSearchVal) === oper;
        case 'amount': return compareNumbers(reg.amount, +basedSearchVal) === oper;
        case 'date': return compareDates(reg.date, basedSearchVal) === oper;
        default: 
          const regVal = utf8ToAscii(reg[filterTypeKey]).toLocaleLowerCase();
          return regVal.includes(basedSearchVal);
      }
    });

    setFilterValue(newInputValue);
    storeFilteredRegisters(newFilteredRegs);
  }

  function showOperands(): boolean{
    return ['price', 'amount', 'date'].includes(filterTypeKey);
  }

  return(
    <div className="filters-container">
      <label htmlFor="input" className="label" ref={filterInputRef}>
        <input 
          className="input" 
          id="input"
          type={filterTypeKey === 'date' ? 'date' : 'text'}
          placeholder='Digite o filtro ...'
          onChange={filterTable}
          value={filterValue}
        />
        <FiFilter/>
      </label>

      <label htmlFor="select" className="label" ref={filterTypeInputRef}>
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
            }) 
          }
        </ul>
      </label>
      
      <div className={`label-overflow-div ${ overflow }`} >
        <label 
          htmlFor="select-operand" 
          className={`label operand ${ showOperands() && 'visible' }`}
          ref={operandInputRef}
        >
          <input 
            className="input operand"
            id="select-operand"
            type="text"
            readOnly 
            value={operand === 0 ? '=' : operand === -1 ? '<' : '>' }
            onFocus={()=>{ setIsOperandDropDownOpen(true); }}
          />
          <FiChevronDown/>
          <ul 
            className="input-dropdown operand"
            style={{ visibility: isOperandDropDownOpen ? 'visible': 'hidden', 
              top: isOperandDropDownOpen ? '2.1rem' : '1rem'
            }}
          >
            { operands.map((op)=>{
              return(
                <li 
                  key={op.value} 
                  value={op.value}
                  onClick={handleSelectOperand}
                >
                  { op.icon }
                </li>
              )
            }) }
          </ul>
        </label>
      </div>

      <button 
        className="button"
        onClick={()=>{
          storeModalState(true);
          changeFormMethod('POST');
        }}
      >
        Novo lançamento
      </button>
    </div>
  )
}