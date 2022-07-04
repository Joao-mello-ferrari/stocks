import { useState } from "react"
import { useAuth } from "../../contexts/authContext"

import { Header } from '../../components/Header'
import { Resume } from "../../components/Resume"
import { Filters } from "../../components/Filters"
import { Table } from "../../components/Table"
import { NewRegisterModal } from '../../components/NewRegisterModal'

import './styles.scss'

export function Dashboard(){
  const [isResumeClosed, setIsResumeClosed] = useState(false);
  const [isAddNewRegisterModalOpen, setIsAddNewRegisterModalOpen] = useState(false);
  
  return(
    <div className="container">
      <NewRegisterModal 
        open={isAddNewRegisterModalOpen} 
        onClose={setIsAddNewRegisterModalOpen}
      />
      <Header/>
      <Resume onClose={setIsResumeClosed} isResumeCLosed={isResumeClosed}/>
      <Filters 
        customStyles={ isResumeClosed ? { marginTop: '1rem'} : {}}
        onNewRegisterButtonClick={setIsAddNewRegisterModalOpen}
      />
      <Table/>
    </div>
  )
}