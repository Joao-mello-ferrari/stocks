import { useState, useEffect } from "react";

import { useQuery } from "react-query";
import { useAuth } from "../../contexts/authContext";
import { loadRegisters } from "../../api/loadRegisters";

import { Header } from "../../components/Header";
import { MyChart } from "../../components/Chart";
import { FiArrowRightCircle, FiFileText } from "react-icons/fi";

import { IMappedData, IMGraphData } from '../../interfaces/ResumeInterfaces';

import './styles.scss';

export function Resume(){
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery(
    'loadRegisters', 
    async () => await loadRegisters(user?.email), 
    { staleTime: Infinity }
  );

  const [mappedData, setMappedData] = useState<IMappedData>({} as IMappedData);
  const [graphData, setGraphData] = useState<IMGraphData>({ sum:0,a:0,b:0,c:0,d:0 });

  useEffect(()=>{
    if(data !== undefined){
      let newMappedData: IMappedData = {
        'a': {
          name: 'Ações',
          registers: [],
          total: 0,
          perc: 0,
        },
        'b': {
          name: 'Real State',
          registers: [],
          total: 0,
          perc: 0,
        },
        'c': {
          name: 'Cash',
          registers: [],
          total: 0,
          perc: 0,
        },
        'd': {
          name: 'Ativos Int',
          registers: [],
          total: 0,
          perc: 0,
        },
      }

      const newGraphData = data.reduce((total, cur)=>{
        let index: 'a' | 'b' | 'c' | 'd' = 'a';
        switch(cur.asset_class){
          case 'Ações': index = 'a'; break;
          case 'Real State': index = 'b'; break;
          case 'Cash': index = 'c'; break;
          case 'Ativos Int': index = 'd'; break;
          default: index = 'a'; break;
        }

        newMappedData[index].registers.push(cur);
        newMappedData[index].total += cur.total;

        return { 
          ...total, 
          sum: Number((total.sum+cur.total).toFixed(2)), 
          [index]: Number((total[index]+cur.total).toFixed(2)) 
        }
      }, {sum: 0,a:0,b:0,c:0,d:0});
      
      const { a, b, c, d, sum } = newGraphData;
      newMappedData.a.perc = Number((a/sum).toFixed(2));
      newMappedData.b.perc = Number((b/sum).toFixed(2));
      newMappedData.c.perc = Number((c/sum).toFixed(2));
      newMappedData.d.perc = Number((d/sum).toFixed(2));

      setMappedData(newMappedData);
      setGraphData(newGraphData);

    };
    
  },[data]);

  const [isAListOPen, setIsAListOPen] = useState(false);
  const [isBListOPen, setIsBListOPen] = useState(false);
  const [isCListOPen, setIsCListOPen] = useState(false);
  const [isDListOPen, setIsDListOPen] = useState(false);

  return(
    <div className="resume-container">
      <Header/>
      <div className="secondary-resume-container">

        <MyChart data={graphData}/>
        <div className="stocks">
          <h3>Resumo dos investimentos</h3>
          <div className="total">
            <h3>Total investido</h3>
            <FiFileText/>
            <span>R$ 2.000,00</span>
          </div>
          
          <ul className="stocks-type-list">
            <li className={`${ isAListOPen && 'open'}`}>
              <div className="li-title-container">
                <FiArrowRightCircle onClick={()=>setIsAListOPen(!isAListOPen)}/>
                <span className="title">A<span>ções - </span></span>
                <span className="amount">R$ 500,00 (25%)</span>
              </div>

              <ul className="li-stocks-list">
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
              </ul>

            </li>

            <li className={`${ isBListOPen && 'open'}`}>
              <div className="li-title-container">
              <FiArrowRightCircle onClick={()=>setIsBListOPen(!isBListOPen)}/>
                <span className="title">A<span>ções - </span></span>
                <span className="amount">R$ 500,00 (25%)</span>
              </div>

              <ul className="li-stocks-list">
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
                <li>
                  investimento 1 - 50 reais
                </li>
              </ul>

            </li>

          
          </ul>
        </div>
        
      </div>
    </div>
  )
}