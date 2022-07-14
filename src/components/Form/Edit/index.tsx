import { ChangeEvent, Dispatch, FormEvent, MutableRefObject, SetStateAction, useRef, useState } from "react";
import { Input } from "./Input";

import { useAuth } from "../../../contexts/authContext";
import { useRegisters } from "../../../contexts/registersContext";
import { calculateTotal, formatCurrency, formatNumber } from "../../../helpers/numbersFormatters";
import { onSubmitInputProps } from "../../../interfaces/Submit";
import { getDateConverted, isoDateFromInput } from "../../../helpers/dateConversion";

import '../styles.scss'

interface FormProps{
  closeModalByForm: Dispatch<SetStateAction<boolean>>;
}

export function Form({ closeModalByForm }: FormProps){
  // const {  } = useAuth();
  const { registerToEdit: r } = useRegisters();
  
  const [priceInput, setPriceInput] = useState(formatCurrency(String(r?.price), false));
  const [amountInput, setAmountInput] = useState(formatNumber(String(r.amount)));

  const editFormRef = useRef() as MutableRefObject<HTMLFormElement>;

  function value(value: string | number){
    if(!value) return 'Não há';
    return String(value)
  }

  function handleEditRegister(e: FormEvent){
    e.preventDefault();
    const originalElements = Array.from([editFormRef.current.elements][0]);
    const elements = originalElements
      .filter(item => item.tagName === 'INPUT') as unknown as onSubmitInputProps[];

    const editFormData = new FormData();
    let hasEditedAtLeastOneField = false;

    elements.map(i=>{
      if(i.value !== getDefaultValues(i.name)){
        hasEditedAtLeastOneField = true;
      } 
  
      if(i.name === 'date') return isoDateFromInput(i.value);
      return editFormData.append(i.name, i.value);
    });

    if(!hasEditedAtLeastOneField){
      // addToast('sadasdasd')
      return
    }

    // post
    // addToast
    
    function getDefaultValues(key: 'asset_class' | 'name' | 'amount' | 'price' | 'total' | 'date'): string{
      switch(key){
        case 'amount': return formatNumber(String(r?.amount));
        case 'price': return formatCurrency(String(r?.price));
        case 'total': return formatCurrency(String(r?.amount * r?.price));
        case 'date': return getDateConverted(r?.date);
        default: return r[key];
      }
    }
  }

  function handlePriceChange(e: ChangeEvent<HTMLInputElement>){
    const price = e.target.value;
    const newPrice = formatCurrency(price);
    setPriceInput(newPrice);
  }

  function handleAmountChange(e: ChangeEvent<HTMLInputElement>){
    const amount = e.target.value;
    const newAmount = formatNumber(amount);
    setAmountInput(newAmount);
  }

  function clearInputs(){
    setPriceInput('');
    setAmountInput('');
  }
  
  function getPrice(){
    const mainValue = priceInput;
    const defaultValue = formatCurrency(String(r?.price));
    return mainValue || defaultValue;
  }

  function getAmount(){
    const mainValue = amountInput;
    const defaultValue = formatNumber(String(r?.amount));
    
    return mainValue || defaultValue;
  }

  function getTotal(){
    const mainValue = calculateTotal(priceInput, amountInput);
    const defaultValue = calculateTotal(getPrice(), getAmount());
    return mainValue || defaultValue;
  }

  return(
    <form ref={editFormRef} className="form" onSubmit={handleEditRegister}>
      <fieldset>
        <Input
          name='asset_class'
          label='Classe do ativo'
          defaultValue={value(r?.asset_class)}
        />
        <Input
          name='name'
          label='Nome do ativo'
          defaultValue={value(r?.name)}
        />
      </fieldset>

      <fieldset>
        <Input
          name='amount'
          label='Quantidade'
          value={getAmount()}
          onChange={handleAmountChange}
        />
        <Input
          name='price'
          label='Preço unitário'
          value={getPrice()}
          onChange={handlePriceChange}
        />
      </fieldset>

      <fieldset>
        <Input
          name='total'
          label='Total'
          readOnly
          value={getTotal()}
        />
        <Input
          name='date'
          label='Data'
          type="date"
          defaultValue={getDateConverted(r?.date)}
        />
      </fieldset>

      <fieldset>
        <button 
          type="submit" 
          className="submit"
        >
          Cadastrar
        </button>
        <button 
          type="reset" 
          className="reset"
          onClick={clearInputs}
        >
          Limpar
        </button>
        <button 
          type="button" 
          className="back"
          onClick={()=>{ closeModalByForm(false); }}
        >
          Voltar
        </button>
      </fieldset>
    </form>
  )
}