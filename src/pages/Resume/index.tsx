import { Header } from "../../components/Header";
import { MyChart } from "../../components/Chart";

import './styles.scss';
import { FiArrowRightCircle } from "react-icons/fi";
import { useState } from "react";



export function Resume(){
  // const [classes, setClasses] = useState(mappedClasses);
  const [isAListOPen, setIsAListOPen] = useState(false);

  return(
    <div className="container">
      <Header/>
      <div className="secondary-container">

        <MyChart/>
        <div className="stocks">
          <h3>Resumo dos investimentos</h3>
          <h4>Total investido: R$ 2.000,00</h4>
          <ul>
            <li className="open">
              <div>
                <span>A<span>ções</span></span>
                <span> R$ 500,00 - 25%</span>
              </div>
              <div >
                <span >
                  Visualizar investimentos
                  <FiArrowRightCircle onClick={()=>{setIsAListOPen(!isAListOPen)}}/>
                </span>
                {/* { isAListOPen &&  */}
                <div style={{overflow: 'hidden'}}>

                
                  <ul className={`stocks-list ${ isAListOPen && 'open'}`}>
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
                  </div>
                {/* } */}
              </div>

            </li>

            <li>
              <div>
                <span>A<span>ções</span></span>
                <span> R$ 500,00 - 25%</span>
              </div>
              <div>
                <span>
                  Visualizar investimentos
                  <FiArrowRightCircle/>
                </span>
                { true && 
                  <ul>
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
                }
              </div>

            </li>
           
          </ul>
        </div>
        
      </div>
    </div>
  )
}