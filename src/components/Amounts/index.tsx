import { useEffect, useState } from 'react';

import { loadRegisters } from '../../api/loadRegisters';
import { useQuery } from 'react-query';
import { useAuth } from '../../contexts/authContext';
import { useRegisters } from '../../contexts/registersContext';

import { FiChevronDown, FiX } from 'react-icons/fi';
import { Card } from './Card';

import './styles.scss';

interface AmountsProps{
  isAmountsCLosed: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Amounts({ isAmountsCLosed, onClose }: AmountsProps){
  const { user } = useAuth();

  const { filteredRegisters: data } = useRegisters();
  
  const { isLoading, error } = useQuery(
    'loadRegisters', 
    async () => await loadRegisters(user?.email), 
    { staleTime: Infinity }
  );

  const [buy, setBuy] = useState<number>(0);
  const [sell, setSell] = useState<number>(0);
  const [available, setAvailable] = useState<number>(0);

  useEffect(()=>{
    if(data !== undefined){
      const values = data.reduce((total, reg)=>{
        if(reg.action_type === 'buy'){
          const newBuy = total.buy + Number((reg.price*reg.amount).toFixed());
          const newAvailable = total.available + Number((reg.price*reg.amount).toFixed());
          return { ...total, buy: newBuy, available: newAvailable };
        }
        else if(reg.action_type === 'sell'){
          const newSell = total.sell + Number((reg.price*reg.amount).toFixed(2));
          const newAvailable = total.available - Number((reg.price*reg.amount).toFixed(2));
          return { ...total, sell: newSell, available: newAvailable };
        }
        return total;
      },{ buy: 0, sell: 0, available: 0})

      setBuy(values.buy);
      setSell(values.sell);
      setAvailable(values.available);
    }
  },[data]);
  
  return(
    <section className="amounts-container">
      <div 
        className={
          `amounts-itens-container
          ${ isAmountsCLosed && 'amounts-itens-container-tighten' }
        `}
      >
        <Card
          type='buy'
          loading={isLoading}
          error={error !== null}
          translate={isAmountsCLosed}
          value={buy}
        />

        <Card
          type='sell'
          loading={isLoading}
          error={error !== null}
          translate={isAmountsCLosed}
          value={sell}
        />

        <Card
          type='available'
          loading={isLoading}
          error={error !== null}
          translate={isAmountsCLosed}
          value={available}
        />
        

        { isAmountsCLosed
          ? <FiChevronDown className="close-icon" onClick={()=>{ onClose(false); }}/>
          : <FiX className="close-icon" onClick={()=>{ onClose(true); }}/>
        }
      </div>
    </section>
  )
}