import { useState, useEffect } from "react";

import { useQuery } from "react-query";
import { useAuth } from "../../contexts/authContext";
import { loadRegisters } from "../../api/loadRegisters";

import { formatCurrencyToDisplay } from '../../helpers/numbersFormatters';

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
          perc: '0',
        },
        'b': {
          name: 'Real State',
          registers: [],
          total: 0,
          perc: '0',
        },
        'c': {
          name: 'Cash',
          registers: [],
          total: 0,
          perc: '0',
        },
        'd': {
          name: 'Ativos Int',
          registers: [],
          total: 0,
          perc: '0',
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
        newMappedData[index].total = Number((
          cur.total+newMappedData[index].total
        ).toFixed(2));

        return { 
          ...total, 
          sum: Number((total.sum+cur.total).toFixed(2)), 
          [index]: Number((total[index]+cur.total).toFixed(2)) 
        }
      }, {sum: 0,a:0,b:0,c:0,d:0});
      
      const { a, b, c, d, sum } = newGraphData;
      newMappedData.a.perc = ((a/sum)*100).toFixed(2).replace('.',',');
      newMappedData.b.perc = ((b/sum)*100).toFixed(2).replace('.',',');
      newMappedData.c.perc = ((c/sum)*100).toFixed(2).replace('.',',');
      newMappedData.d.perc = ((d/sum)*100).toFixed(2).replace('.',',');

      setMappedData(newMappedData);
      setGraphData(newGraphData);
    };
    
  },[data]);

  const [isAListOPen, setIsAListOPen] = useState(false);
  const [isBListOPen, setIsBListOPen] = useState(false);
  const [isCListOPen, setIsCListOPen] = useState(false);
  const [isDListOPen, setIsDListOPen] = useState(false);
  

  if(Object.keys(mappedData).length === 0){
    return(
      <div className="resume-container">
      <Header/>
      <div className="secondary-resume-container">

      </div>
      </div>
    )
  }

  return(
    <div className="resume-container">
      <Header/>
      <div className="secondary-resume-container">

        <MyChart data={graphData}/>
        <div className="stocks">
          <div className="resume">
            <h3>Resumo dos investimentos</h3>
            <FiFileText/>
          </div>
          
          <div className="total">
            <h3>Total investido</h3>
            <span>{ formatCurrencyToDisplay(graphData.sum) }</span>
          </div>

          <ul className="stocks-type-list">
            <li className={`${ isAListOPen && 'open'} outer-li`}>
              <div className="li-title-container">
                <FiArrowRightCircle onClick={()=>setIsAListOPen(!isAListOPen)}/>
                <span className="title a">A<span>ções - </span></span>
                <span className="amount">
                  {formatCurrencyToDisplay(mappedData.a.total)} ({mappedData.a.perc}%)
                </span>
              </div>

              <ul className="li-stocks-list">
                { mappedData.a.registers.map((r)=>(
                  <li key={r.ref.value.id}>
                    { r.name } - { formatCurrencyToDisplay(r.total) }
                  </li>
                ))
                }
              </ul>
            </li>

            <li className={`${ isBListOPen && 'open'} outer-li`}>
              <div className="li-title-container">
                <FiArrowRightCircle onClick={()=>setIsBListOPen(!isBListOPen)}/>
                <span className="title b">R<span>eal State - </span></span>
                <span className="amount">
                  {formatCurrencyToDisplay(mappedData.b.total)} ({mappedData.b.perc}%)
                </span>
              </div>

              <ul className="li-stocks-list">
                { mappedData.b.registers.map((r)=>(
                  <li key={r.ref.value.id}>
                    { r.name } - { formatCurrencyToDisplay(r.total) }
                  </li>
                ))
                }
              </ul>
            </li>

            <li className={`${ isCListOPen && 'open'} outer-li`}>
              <div className="li-title-container">
                <FiArrowRightCircle onClick={()=>setIsCListOPen(!isCListOPen)}/>
                <span className="title c">C<span>ash - </span></span>
                <span className="amount">
                  {formatCurrencyToDisplay(mappedData.c.total)} ({mappedData.c.perc}%)
                </span>
              </div>

              <ul className="li-stocks-list">
                { mappedData.c.registers.map((r)=>(
                  <li key={r.ref.value.id}>
                    { r.name } - { formatCurrencyToDisplay(r.total) }
                  </li>
                ))
                }
              </ul>
            </li>

            <li className={`${ isDListOPen && 'open'} outer-li`}>
              <div className="li-title-container">
                <FiArrowRightCircle onClick={()=>setIsDListOPen(!isDListOPen)}/>
                <span className="title d">A<span>tivos Int - </span></span>
                <span className="amount">
                  {formatCurrencyToDisplay(mappedData.d.total)} ({mappedData.d.perc}%)
                </span>
              </div>

              <ul className="li-stocks-list">
                { mappedData.d.registers.map((r)=>(
                  <li key={r.ref.value.id}>
                    { r.name } - { formatCurrencyToDisplay(r.total) }
                  </li>
                ))
                }
              </ul>
            </li>
          
          </ul>
        </div>
        
      </div>
    </div>
  )
}