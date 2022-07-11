import { ChangeEvent, ChangeEventHandler, Dispatch, FormEvent, MutableRefObject, SetStateAction, useRef, useState } from "react";
import { Input } from "./Input";

import '../styles.scss'

interface FormProps{
  closeModalByForm: Dispatch<SetStateAction<boolean>> 
}

export function Form({ closeModalByForm }: FormProps){
  const [priceInput, setPriceInput] = useState('');
  const [amountInput, setAmountInput] = useState('');


  const formRef = useRef() as MutableRefObject<HTMLFormElement>;

  function handleAddRegister(e: FormEvent){
    e.preventDefault();
    [formRef.current.elements].map(item=>console.log(item));
  }

  function handlePriceChange(e: ChangeEvent<HTMLInputElement>){
    let value = e.target.value;
    let valueToFormat = value;
    if(value.length !== 1){
      value = value.slice(3);
      value = value.replaceAll(',','');
      value = value.replaceAll('.','');
      if(!(/^[0-9]+$/.test(value))) value = value.slice(0,value.length-1);
      
      let decimal='', integer='';
      for(let i=0; i < value.length; i++){
        if(i < value.length-2)integer += value[i];
        else if(i >= value.length-2) decimal += value[i];
      }
      valueToFormat = integer + '.' + decimal;
    }

    if(!(/^[0-9]+$/.test(value))) valueToFormat = '';

    const formatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
    valueToFormat = formatter.format(Number(valueToFormat));
    setPriceInput(valueToFormat);
  }

  function handleAmountChange(e: ChangeEvent<HTMLInputElement>){
    let amount = e.target.value;
    amount = amount.replaceAll(',','');
    amount = amount.replaceAll('.','');
  
    const formatter = Intl.NumberFormat('pt-BR', { notation: 'standard' })
    
    amount = formatter.format(Number(amount));
    setAmountInput(amount);
  }

  function calculateTotal(){
    if(!priceInput || !amountInput) return '';

    let price = priceInput;
    price = price.slice(3);
    price = price.replaceAll(',','');
    price = price.replaceAll('.','');
    
    let integer = price.slice(0,price.length-2);
    let decimal = price.slice(price.length-2);
    price = integer + '.' + decimal;

    let amount = amountInput;
    amount = amount.replaceAll(',','');
    amount = amount.replaceAll('.','');
  

    const formatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
    const total = formatter.format(Number(price)*Number(amount));

    return total;
  }

  function clearInputs(){
    setPriceInput('');
    setAmountInput('');
  }


  return(
    <form className="form" ref={formRef} onSubmit={handleAddRegister}>
      <fieldset>
        <Input
          name='class'
          label='Classe do ativo'
        />
        <Input
          name='name'
          label='Nome do ativo'
        />
      </fieldset>

      <fieldset>
        <Input
          name='amount'
          label='Quantidade'
          // type='number'
          value={amountInput}
          onChange={handleAmountChange}
        />
        <Input
          name='price'
          label='Preço unitário'
          value={priceInput}
          onChange={handlePriceChange}
        />
      </fieldset>

      <fieldset>
        <Input
          name='total'
          label='Total'
          readOnly
          value={calculateTotal()}
        />
        <Input
          name='date'
          label='Data'
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