import { useEffect, useState } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi'
import { useQuery } from 'react-query';
import { loadRegisters } from '../../api/loadRegisters';
import { Card } from './Card';

import './styles.scss'

interface ResumeProps{
  isResumeCLosed: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Resume({ isResumeCLosed, onClose }: ResumeProps){
  const { data, isLoading, error } = useQuery(
    'loadRegisters', 
    async () => await loadRegisters(), 
    { staleTime: Infinity }
  );

  const [buy, setBuy] = useState<number>(0);
  const [sell, setSell] = useState<number>(0);
  const [available, setAvailable] = useState<number>(0);

  useEffect(()=>{
    if(data !== undefined){
      const values = data.reduce((total, reg)=>{
        if(reg.action_type === 'buy'){
          const newBuy = total.buy + (reg.price*reg.amount);
          const newAvailable = total.available + (reg.price*reg.amount);
          return { ...total, buy: newBuy, available: newAvailable };
        }
        else if(reg.action_type === 'sell'){
          const newSell = total.sell + (reg.price*reg.amount);
          const newAvailable = total.available - (reg.price*reg.amount);
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
    <section className={
      `resume-container
      ${ isResumeCLosed && 'resume-container-tighten' }`
    }>
      <div 
        className={
          `resume-itens-container
          ${ isResumeCLosed && 'resume-itens-container-tighten' }
        `}
      >
        <Card
          type='buy'
          loading={isLoading}
          error={error !== null}
          translate={isResumeCLosed}
          value={buy}
        />

        <Card
          type='sell'
          loading={isLoading}
          error={error !== null}
          translate={isResumeCLosed}
          value={sell}
        />

        <Card
          type='available'
          loading={isLoading}
          error={error !== null}
          translate={isResumeCLosed}
          value={available}
        />
        

        { isResumeCLosed
          ? <FiChevronDown className="close-icon" onClick={()=>{ onClose(false); }}/>
          : <FiX className="close-icon" onClick={()=>{ onClose(true); }}/>
        }
      </div>
    </section>
  )
}