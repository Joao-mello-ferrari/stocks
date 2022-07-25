import { ChangeEvent, Dispatch, FormEvent, MutableRefObject, SetStateAction, useRef, useState } from "react";
import { Input } from "./Input";
import { Switch } from "../Switch";

import { useAuth } from "../../../contexts/authContext";
import { useToast } from "../../../contexts/toastContext";
import { useRegisters } from "../../../contexts/registersContext";
import { calculateTotal, formatCurrency, formatNumber, getRawCurVal, getRawNumberVal } from "../../../helpers/numbersFormatters";
import { onSubmitInputProps } from "../../../interfaces/Submit";
import { getDateConverted, isoDateFromInput } from "../../../helpers/dateConversion";

import { FiXCircle } from 'react-icons/fi'

import '../styles.scss'
import { updateRegister } from "../../../api/updateRegister";
import { Register } from "../../../interfaces/Register";
import { AppError } from "../../../errors/AppError";
import { BounceLoader } from "react-spinners";

interface FormProps{
  closeModalByForm: Dispatch<SetStateAction<boolean>>;
}

export function Form({ closeModalByForm }: FormProps){
  const { registerToEdit: r } = useRegisters();
  
  const [priceInput, setPriceInput] = useState(formatCurrency(String(r?.price)));
  const [amountInput, setAmountInput] = useState(formatNumber(String(r.amount)));
  
  const editFormRef = useRef() as MutableRefObject<HTMLFormElement>;
  
  const { addToast } = useToast(); 

  function value(value: string | number){
    if(!value) return 'Não há';
    return String(value)
  }

  async function handleEditRegister(e: FormEvent){
    e.preventDefault();
    const originalElements = Array.from([editFormRef.current.elements][0]);
    const elements = originalElements
      .filter(item => item.tagName === 'INPUT') as unknown as onSubmitInputProps[];

    const newRegister = {} as Omit<Register, 'ref'>;
    let hasEditedAtLeastOneField = false;

    elements.map(i=>{
      if(i.value !== getDefaultValues(i.name))
        hasEditedAtLeastOneField = true;
      
      switch(i.id){
        case 'price': return newRegister.price =  +getRawCurVal(i.value);
        case 'amount': return newRegister.amount = +getRawNumberVal(i.value);
        case 'total': return newRegister.total = +getRawCurVal(i.value);
        case 'date':
          const [y,m,d] = (i.value.split('-')).map(i=>Number(i));
          return newRegister.date = new Date(y,m-1,d).toISOString();
        default: return newRegister[i.id] = i.value;
      }
    });

    if(!hasEditedAtLeastOneField){
      addToast({ 
        type: 'warning', 
        title: 'Edição', 
        message: 'É preciso alterar ao menos um campo!' 
      });
      return;
    }
    
    try{
      const updatedRegister = await updateRegister(r.ref, newRegister);
      
      // update cache

      addToast({ 
        type: 'success', 
        title: 'Edição', 
        message: `Ativo ${newRegister.name} atualizado com sucesso.` 
      });
      closeModalByForm(false);
      
    }catch(err){
      if(err instanceof AppError){
        const { title, message } = err;
        addToast({ type: 'error', title, message });
      }
      else{
        addToast({ 
          type: 'error', 
          title: 'Edição', 
          message: 'Erro ao realizar operação.' 
        });
      }
    }finally{ 
      // setIsSubmiting(false); 
      // setHasSubmited(true);
    }
    
    
    
    function getDefaultValues(key: onSubmitInputProps['id']): string{
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
          id="asset_class"
          label='Classe do ativo'
          defaultValue={value(r?.asset_class)}
        />
        <Input
          name='name'
          id='name'
          label='Nome do ativo'
          defaultValue={value(r?.name)}
        />
      </fieldset>

      <fieldset>
        <Input
          name='amount'
          id='amount'
          label='Quantidade'
          value={getAmount()}
          onChange={handleAmountChange}
        />
        <Input
          name='price'
          id='price'
          label='Preço unitário'
          value={getPrice()}
          onChange={handlePriceChange}
        />
      </fieldset>

      <fieldset>
        <Input
          name='total'
          id='total'
          label='Total'
          readOnly
          value={getTotal()}
        />
        <Input
          name='date'
          id='date'
          label='Data'
          type="date"
          defaultValue={getDateConverted(r?.date)}
        />
      </fieldset>

      <fieldset>
        <Switch
          name="action_type"
          id="action_type"
          label="Tipo: "
          values={['Compra', 'Venda']}
          keyValues={['buy', 'sell']}
          defaultValue={Number(r?.action_type === 'sell')}
        />
        <div className="buttons-container">
          <button 
            type="submit" 
            className="submit"
            disabled={true}
          >
            { true
              ? <BounceLoader
                  color="#eef1ff"
                  size={20}
                />
              : 'Salvar'
            }
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