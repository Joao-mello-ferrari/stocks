import { useState, useEffect } from "react";

import { useQuery } from "react-query";
import { useAuth } from "../../contexts/authContext";
import { loadRegisters } from "../../api/loadRegisters";

import { formatCurrencyToDisplay, formatNumber } from '../../helpers/numbersFormatters'
import { compareDates, getDateConverted } from '../../helpers/dateConversion'

import { Header } from "../../components/Header";
import { FiList } from "react-icons/fi";

import { Register } from "../../interfaces/Register";

import './styles.scss';

interface ResumeObject{
  avg: number;
  valSum: number;
  quantSum: number;
  highestPrice: number;
  lowestPrice: number;
  first: string;
  last: string;
}

export function AveragePrice(){
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery(
    'loadRegisters', 
    async () => await loadRegisters(user?.email), 
    { staleTime: Infinity }
  );


  const [listData, setListData] = useState<string[]>([]);
  const [filteredListData, setFilteredListData] = useState<string[]>([]);
  
  const [activeStocks, setActiveStocks] = useState<Register[]>([]);
  const [activeStocksResume, setActiveStocksResume] = useState<ResumeObject>({} as ResumeObject);
  
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  useEffect(()=>{
    if(data === undefined) return; 
    const mappedData = data.map(item=> item.name );
    const dataSet = new Set(mappedData);

    setListData(Array.from(dataSet)); 
    setFilteredListData(Array.from(dataSet));
  },[data]);

  function filterList(regex: string){
    if(regex === '') return setFilteredListData(listData);
    setFilteredListData(()=>{
      if(listData === undefined) return [];
      return listData.filter(item=>item
        .toLowerCase()
        .includes(regex.toLowerCase()         
      ))
    });

  }

  function handleSelectStock(name: string){
    if(data === undefined) return;
    
    const stocks = data.filter(item=>item.name === name);
    let resume:ResumeObject = {
      avg: 0,
      valSum: 0,
      quantSum: 0,
      highestPrice: 0,
      lowestPrice: 0,
      first: '',
      last: ''
    };

    stocks.map(item=>{
      resume.valSum += (item.price * item.amount);
      resume.quantSum += item.amount;

      if(item.price > resume.highestPrice) 
        resume.highestPrice = item.price;

      if(resume.lowestPrice === 0 || item.price < resume.lowestPrice) 
        resume.lowestPrice = item.price;

      if(resume.first === '' || compareDates(item.date,resume.first) === -1)
        resume.first = item.date;
      

      if(resume.last === '' || compareDates(item.date,resume.first) === 1)
        resume.last = item.date;
      
    });

    resume.quantSum = Number(resume.quantSum.toFixed(2));
    resume.valSum = Number(resume.valSum.toFixed(2));
    resume.avg = Number((resume.valSum/resume.quantSum).toFixed(2));

    
    setActiveStocks(stocks);
    setActiveStocksResume(resume);
  }

  return(
    <div className="resume-container">
      <Header/>
      <main className="secondary-average-container">
        <h2>Visualize o preço médio de um ativo!</h2>
        <input 
          type="text"
          placeholder="Busque por um ativo"
          onChange={(e)=>{ filterList(e.target.value); }}
          onFocus={()=>{ setIsDropDownOpen(true); }}
          onBlur={()=>{ setTimeout(()=> setIsDropDownOpen(false),100) }}
        />

        { isDropDownOpen &&
        <div className="stocks-name-list-container">
          <ul className="stocks-name-list">
            { filteredListData.map((item, index)=>(
              <li key={index} onClick={()=>handleSelectStock(item)}>{item}</li>
              ))}
          </ul>
        </div>
        }

        { activeStocks.length !== 0 &&
          <div className="stock-info">
            <div className="stock-general-info">
              <h4>Ativo <span>{activeStocks[0]?.name}</span></h4>
              <ul>
                <li>Preço médio: {formatCurrencyToDisplay(activeStocksResume.avg)}</li>
                <li>Preço total: {formatCurrencyToDisplay(activeStocksResume.valSum)}</li>
                <li>Quantidade de ativos: {formatNumber(activeStocksResume.quantSum)}</li>
                <li>Maior preço: {formatCurrencyToDisplay(activeStocksResume.highestPrice)}</li>
                <li>Menor preço: {formatCurrencyToDisplay(activeStocksResume.lowestPrice)}</li>
                <li>Primeira aquisição: {getDateConverted(activeStocksResume.first, true)}</li>
                <li>Última aquisição: {getDateConverted(activeStocksResume.last, true)}</li>
              </ul>
            </div >

            <div className="stock-list">
              <h4>
                Lista de ativos
                <FiList/> 
              </h4>
              <ul>
                { activeStocks.map((item, index)=>(
                  <li key={index}>
                    {formatNumber(item.amount)}&nbsp;unidade(s),
                    a&nbsp;
                    {formatCurrencyToDisplay(item.price)}, no dia &nbsp;
                    {getDateConverted(item.date, true)}
                  </li>
                ))
                }
              </ul>
            </div>
          </div>
        }
      </main>
    </div>
  )
}