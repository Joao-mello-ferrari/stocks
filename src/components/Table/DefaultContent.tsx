import { FiAlertTriangle } from "react-icons/fi";
import { HashLoader } from 'react-spinners'

import './styles.scss'

interface DefaultContentProps{
  noData: boolean;
  loading: boolean;
}

export function DefaultContent({ noData, loading }: DefaultContentProps){
  if(noData && !loading){
    return(
      <div className="default-contentar-container">
        <h1>Não foram encontrados dados</h1>
        <FiAlertTriangle/>
      </div>
    )
  }

  if(noData && loading){
    return(
      <div className="default-contentar-container">
        <HashLoader
          color="#eef1ff"
          size={80}
        />
      </div>
    )
  }

  return(<></>)
  
}