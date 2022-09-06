import { FiArrowDownCircle, FiArrowUpCircle, FiDollarSign } from "react-icons/fi";
import { getContent } from "./CardContents";

import './styles.scss'

interface CardProps{
  type: 'buy' | 'sell' | 'available';
  loading: boolean;
  error: boolean;
  translate: boolean;
  value: number;
}

const icons = {
  buy: <FiArrowUpCircle/>,
  sell:  <FiArrowDownCircle/>,
  available: <FiDollarSign/>
}

const texts = {
  buy:  'Valor comprado',
  sell: 'Valor vendido',
  available: 'Disponível para venda'
}

export function Card({ type, loading, error, translate, value }:CardProps){
  return(
    <div className={
      `card 
      ${ type } 
      ${ translate && 'card-translate-y' }`
    }
    >
      <div className="title">
        { icons[type] }
        <span>{ texts[type] }</span>
      </div>
      { getContent(loading, error, value) }
    </div>
  )
}