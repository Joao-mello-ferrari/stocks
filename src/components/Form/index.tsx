import { Input } from "./Input";

import './styles.scss'

export function Form(){
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
        <button type="submit" className="submit">Cadastrar</button>
        <button type="reset">Limpar</button>
        <button type="button">Voltar</button>
      </fieldset>
    </form>
  )
}