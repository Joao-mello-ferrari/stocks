import { Dispatch, SetStateAction } from "react";
import { Input } from "./Input";

import { useAuth } from "../../../contexts/authContext";
import { useRegisters } from "../../../contexts/registersContext";

import '../styles.scss'

interface FormProps{
  closeModalByForm: Dispatch<SetStateAction<boolean>>;
}

export function Form({ closeModalByForm }: FormProps){
  // const {  } = useAuth();
  const { registerToEdit: r } = useRegisters();
  
  function value(value: string | number){
    if(!value) return 'Não há';
    return String(value)
  }

  return(
    <form className="form" onSubmit={()=>{}}>
      <fieldset>
        <Input
          name='class'
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
          defaultValue={value(r?.amount)}
        />
        <Input
          name='price'
          label='Preço unitário'
          defaultValue={value(r?.price)}
        />
      </fieldset>

      <fieldset>
        <Input
          name='total'
          label='Total'
          defaultValue={`${Number(r?.amount)*Number(r?.price)}`}
        />
        <Input
          name='date'
          label='Data'
          type="date"
          defaultValue={'12/12/2022'}
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