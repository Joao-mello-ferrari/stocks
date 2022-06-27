import { useAuth } from "../../contexts/authContext"

import { Header } from '../../components/Header'
import { Resume } from "../../components/Resume"
import { Filters } from "../../components/Filters"

import './styles.scss'
import { useState } from "react"

export function Dashboard(){
  const [isResumeClosed, setIsResumeClosed] = useState(false);

  return(
    <div className="container">
      <Header/>
      <Resume onClose={setIsResumeClosed} isResumeCLosed={isResumeClosed}/>
      <Filters customStyles={ isResumeClosed ? { marginTop: '1rem'} : {}}/>
      
    </div>
  )
}