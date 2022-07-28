import { FiAirplay } from "react-icons/fi";

import './styles.scss';

export function MobileDashBoard(){
  return(
    <div className="text-container">
      <h3>
        Oops... 
      </h3>
      <h4>Esse sistema ainda não está disponível para ser visualizado pelo celular</h4>
      <h4>
        Acesse pelo seu computador e controle suas finanças! 
      </h4>
        <FiAirplay/>
    </div>
  )
}