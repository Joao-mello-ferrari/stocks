import { ChangeEvent, ChangeEventHandler, Dispatch, FormEvent, MutableRefObject, SetStateAction, useRef, useState } from "react";
import { Input } from "./Input";

import { formatCurrency, formatNumber, calculateTotal } from '../../../helpers/numbersFormatters'

import '../styles.scss'
import { onSubmitInputProps } from "../../../interfaces/Submit";

interface FormProps{
  closeModalByForm: Dispatch<SetStateAction<boolean>> 
}

export function Form({ closeModalByForm }: FormProps){
  const [priceInput, setPriceInput] = useState('');
  const [amountInput, setAmountInput] = useState('');


  const addFormRef = useRef() as MutableRefObject<HTMLFormElement>;

  function handleAddRegister(e: FormEvent){
    e.preventDefault();
    const originalElements = Array.from([addFormRef.current.elements][0]);
    const elements = originalElements
      .filter(item => item.tagName === 'INPUT') as unknown as onSubmitInputProps[];
    
    const addFormData = new FormData();

    elements.map(i=>{
      if(i.name === 'date'){
        const [y,m,d] = (i.value.split('-')).map(i=>Number(i));
        let a = new Date(y,m-1,d,1,1)
        return new Date(y,m-1,d).toISOString();
      }
      return addFormData.append(i.name, i.value)
    });
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


  return(
    <form className="form" ref={addFormRef} onSubmit={handleAddRegister}>
      <fieldset>
        <Input
          name='class'
          label='Classe do ativo'
          required
        />
        <Input
          name='name'
          label='Nome do ativo'
          required
        />
      </fieldset>

      <fieldset>
        <Input
          name='amount'
          label='Quantidade'
          required
          value={amountInput}
          onChange={handleAmountChange}
        />
        <Input
          name='price'
          label='Preço unitário'
          required
          value={priceInput}
          onChange={handlePriceChange}
        />
      </fieldset>

      <fieldset>
        <Input
          name='total'
          label='Total'
          readOnly
          value={calculateTotal(priceInput, amountInput)}
        />
        <Input
          name='date'
          label='Data'
          required
          type="date"
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