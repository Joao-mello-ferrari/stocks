import { ChangeEvent, FormEvent, MutableRefObject, useRef, useState } from "react";

import { formatNumber, calculateTotal, getRawCurVal, getRawNumberVal, formatCurrencyInput } from '../../../helpers/numbersFormatters'

import { useMutation, useQueryClient } from "react-query";
import { useRegisters } from "../../../contexts/registersContext";
import { useToast } from "../../../contexts/toastContext";
import { useAuth } from "../../../contexts/authContext";
import { createRegister } from "../../../api/createRegister";

import { FiXCircle } from "react-icons/fi";
import { BounceLoader } from "react-spinners";
import { Switch } from "../Switch";
import { Input } from "./Input";

import { AppError } from "../../../errors/AppError";
import { Register } from "../../../interfaces/Register";
import { onSubmitInputProps } from "../../../interfaces/Submit";

import '../styles.scss';

export function Form(){
  const { storeModalState } = useRegisters();

  const queryClient = useQueryClient();
  const { mutate: createQuery, isLoading } = useMutation(
    (e: FormEvent)=>handleAddRegister(e),
    {
      onSuccess: (reg: Register | undefined) => {
        if(reg !== undefined){
          addToast({ 
            type: 'success', 
            title: 'Lançamento', 
            message: `Ativo ${reg.name} cadastrado com sucesso!` 
          });
          queryClient.invalidateQueries('loadRegisters')
        }
        
        storeModalState(false);
      },
      onError: (err) => {
        if(err instanceof AppError){
          const { title, message } = err;
          addToast({ type: 'error', title, message });
        }
        else{
          addToast({ 
            type: 'error', 
            title: 'Cadastro', 
            message: 'Erro ao realizar operação.' 
          });
        }
      }
    }
  );

  const [priceInput, setPriceInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [switchVal, setSwitchVal] = useState('buy');

  const [isWarningToastEnabled, setIsWarningToastEnabled] = useState(true);

  const addFormRef = useRef() as MutableRefObject<HTMLFormElement>;
  
  const { user } = useAuth(); 
  const { addToast } = useToast(); 

  async function handleAddRegister(e: FormEvent){
    e.preventDefault();
    const originalElements = Array.from([addFormRef.current.elements][0]);
    const elements = originalElements
      .filter(item => item.tagName === 'INPUT') as unknown as onSubmitInputProps[];
    
    const newRegister = {} as Omit<Register,'ref>'>;

    elements.map(i=>{
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

    return await createRegister(user.email, newRegister);
  }

  function handlePriceChange(e: ChangeEvent<HTMLInputElement>){
    const price = e.target.value;
    const newPrice = formatCurrencyInput(price);
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
    setSwitchVal('buy')
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

  function changeSwitchValue(){
    if(switchVal === 'buy') return setSwitchVal('sell');
    setSwitchVal('buy');
  }

  return(
    <form className="form" ref={addFormRef} onSubmit={createQuery}>
      <fieldset>
        <Input
          name='asset_class'
          id="asset_class"
          label='Classe do ativo'
          required
        />
        <Input
          name='name'
          id='name'
          label='Nome do ativo'
          required
        />
      </fieldset>

      <fieldset>
        <Input
          name='amount'
          id='amount'
          label='Quantidade'
          required
          value={amountInput}
          onChange={handleAmountChange}
        />
        <Input
          name='price'
          id='price'
          label='Preço unitário'
          required
          value={priceInput}
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
          value={calculateTotal(priceInput, amountInput)}
        />
        <Input
          name='date'
          id='date'
          label='Data'
          required
          type="date"
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