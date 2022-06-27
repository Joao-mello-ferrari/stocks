import { FiFilter } from 'react-icons/fi'

import './styles.scss'

interface FiltersProps{
  customStyles: {}
}

export function Filters({ customStyles }: FiltersProps){

  return(
    <div className="filters-container" style={customStyles}>
      <label htmlFor="input" className="input-container">
        <input 
          className="input" 
          id="input"
          type="text" 
          placeholder='Digite o filtro ...'
        />
        <FiFilter/>
      </label>
      
      <select 
        className="select" 
        name="filter-type" 
        id="filter-type"
      >
        <option value="name">Nome da ação</option>
        <option value="date">Data da compra/venda</option>
        <option value="value">Valor</option>
        <option value="amount">Quantidade</option>
        <option value="classify">Classificação</option>
      </select>
    </div>
  )
}