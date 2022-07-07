import { Dispatch, SetStateAction } from "react";
import { Input } from "./Input";

import '../styles.scss'

interface FormProps{
  closeModalByForm: Dispatch<SetStateAction<boolean>> 
}

export function Form({ closeModalByForm }: FormProps){
  return(
    <form className="form" onSubmit={()=>{}}>
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
        />
        <Input
          name='price'
          label='Preço unitário'
        />
      </fieldset>

      <fieldset>
        <Input
          name='total'
          label='Total'
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