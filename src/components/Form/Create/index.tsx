import { ChangeEvent, Dispatch, FormEvent, MutableRefObject, SetStateAction, useRef, useState } from "react";
import { Input } from "./Input";

import { formatCurrency, formatNumber, calculateTotal, getRawCurVal, getRawNumberVal } from '../../../helpers/numbersFormatters'

import { useToast } from "../../../contexts/toastContext";
import { onSubmitInputProps } from "../../../interfaces/Submit";

import '../styles.scss'
import { FiXCircle } from "react-icons/fi";
import { Switch } from "../Switch";

interface FormProps{
  closeModalByForm: Dispatch<SetStateAction<boolean>>;
}

export function Form({ closeModalByForm }: FormProps){
  const [priceInput, setPriceInput] = useState('');
  const [amountInput, setAmountInput] = useState('');

  const addFormRef = useRef() as MutableRefObject<HTMLFormElement>;

  const { addToast } = useToast(); 

  function handleAddRegister(e: FormEvent){
    e.preventDefault();
    const originalElements = Array.from([addFormRef.current.elements][0]);
    const elements = originalElements
      .filter(item => item.tagName === 'INPUT') as unknown as onSubmitInputProps[];
    
    const addFormData = new FormData();

    elements.map(i=>{
      switch(i.name){
        case 'price': return addFormData.append(i.name, getRawCurVal(i.value));
        case 'amount': return addFormData.append(i.name, getRawNumberVal(i.value));
        case 'total': return addFormData.append(i.name, getRawCurVal(i.value));
        case 'date':
          const [y,m,d] = (i.value.split('-')).map(i=>Number(i));
          return new Date(y,m-1,d).toISOString();
        default: return addFormData.append(i.name, i.value);
      }
    });

    addToast({ 
      type: 'success', 
      title: 'Lançamento', 
      message: 'Cadastrado com sucesso!' 
    });
  }

  function handlePriceChange(e: ChangeEvent<HTMLInputElement>){
    const price = e.target.value;
    const newPrice = formatCurrency(price, false);
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
        <Switch
          name="action_type"
          label="Tipo: "
          values={['Compra', 'Venda']}
          keyValues={['buy', 'sell']}
        />
        <div>
          <button 
            type="submit" 
            className="submit"
          >
            Salvar
          </button>
          <button 
            type="reset" 
            className="reset"
            onClick={clearInputs}
          >
            Resetar
          </button>
        </div>
      </fieldset>

      <FiXCircle
        className="close-icon"
        onClick={()=>{ closeModalByForm(false); }}
      />
    </form>
  )
}