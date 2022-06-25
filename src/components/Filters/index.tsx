export function Filters(){
  return(
    <div>
      <input type="text" />
      <select name="filter-type" id="filter-type">
        <option value="name">Nome da ação</option>
        <option value="date">Data da compra/venda</option>
        <option value="value">Valor</option>
        <option value="amount">Quantidade</option>
        <option value="classify">Classificação</option>
      </select>
    </div>
  )
}