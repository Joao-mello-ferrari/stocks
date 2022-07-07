import { useState } from "react"
import { useAuth } from "../../contexts/authContext"

import { Header } from '../../components/Header'
import { Resume } from "../../components/Resume"
import { Filters } from "../../components/Filters"
import { Table } from "../../components/Table"
import { NewRegisterModal } from '../../components/RegisterModal'

import './styles.scss'

export function Dashboard(){
  const [isResumeClosed, setIsResumeClosed] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [formMethod, setFormMethod] = useState<'POST' | 'PUT'>('POST');

  return(
    <div className="container">
      <NewRegisterModal 
        open={isRegisterModalOpen} 
        onClose={setIsRegisterModalOpen}
        method={formMethod}
      />
      <Header/>
      <Resume onClose={setIsResumeClosed} isResumeCLosed={isResumeClosed}/>
      <Filters 
        customStyles={ isResumeClosed ? { marginTop: '1rem'} : {}}
        onNewRegisterButtonClick={setIsRegisterModalOpen}
        changeFormMethod={setFormMethod}
      />
      <Table 
        moreRows={isResumeClosed} 
        openRegisterEditForm={setIsRegisterModalOpen}
        changeFormMethod={setFormMethod}
      />
    </div>
  )
}