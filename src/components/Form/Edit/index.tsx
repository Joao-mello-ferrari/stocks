import { ChangeEvent, FormEvent, MutableRefObject, SetStateAction, useRef, useState } from "react";

import { useMutation, useQueryClient } from "react-query";
import { updateRegister } from "../../../api/updateRegister";
import { useToast } from "../../../contexts/toastContext";
import { useRegisters } from "../../../contexts/registersContext";
import { calculateTotal, formatCurrency, formatNumber, getRawCurVal, getRawNumberVal } from "../../../helpers/numbersFormatters";
import { getDateConverted } from "../../../helpers/dateConversion";

import { Input } from "./Input";
import { Switch } from "../Switch";
import { FiXCircle } from 'react-icons/fi'
import { BounceLoader } from "react-spinners";

import { AppError } from "../../../errors/AppError";
import { onSubmitInputProps } from "../../../interfaces/Submit";
import { Register } from "../../../interfaces/Register";

import '../styles.scss';

export function Form(){
  const queryClient = useQueryClient();
  const { mutate: editQuery, isLoading } = useMutation(
    (e: FormEvent)=>handleEditRegister(e),
    {
      onSuccess: (reg: Register | undefined) => {
        if(reg !== undefined){
          addToast({ 
            type: 'success', 
            title: 'Edição', 
            message: `Ativo ${reg.name} atualizado com sucesso.` 
          });
          queryClient.invalidateQueries('loadRegisters')
          storeModalState(false);
        }
        
      },
      onError: (err) => {
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
      }
    }
  );

  const { registerToEdit: r, storeModalState } = useRegisters();
  
  const [priceInput, setPriceInput] = useState(formatCurrency(String(r?.price)));
  const [amountInput, setAmountInput] = useState(formatNumber(String(r.amount)));
  const [switchVal, setSwitchVal] = useState(r.action_type);
  
  const [isWarningToastEnabled, setIsWarningToastEnabled] = useState(true);

  const editFormRef = useRef() as MutableRefObject<HTMLFormElement>;
  
  const { addToast } = useToast(); 

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
        case 'action_type': return newRegister.action_type = i.value as 'buy' | 'sell';
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
    
    return await updateRegister(r.ref, newRegister);

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
    setSwitchVal(r.action_type);
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

  function value(value: string | number){
    if(!value) return 'Não há';
    return String(value)
  }

  function changeSwitchValue(){
    if(switchVal === 'buy') return setSwitchVal('sell');
    setSwitchVal('buy');
  }

  function showTotalInputMessage(){
    if(!isWarningToastEnabled) return;
    addToast({
      type: 'warning',
      title: 'Preço total',
      message: 'O valor total é calculado automaticamente, conforme a quantidade e o preço.'
    })
    setIsWarningToastEnabled(false);
    setTimeout(()=>{ setIsWarningToastEnabled(true) },5000);
  }

  return(
    <form ref={editFormRef} className="form" onSubmit={editQuery}>
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
          onKeyDown={showTotalInputMessage}
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
          value={switchVal}
          isOnRight={switchVal === 'sell'}
          changeValue={changeSwitchValue}
          displayedValue={switchVal === 'buy' ? 'Compra' : 'Venda'}
        />
        <div className="buttons-container">
          <button 
            type="submit" 
            className="submit"
            disabled={isLoading}
          >
            { isLoading
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
        onClick={()=>{ storeModalState(false); }}
      />
    </form>
  )
}