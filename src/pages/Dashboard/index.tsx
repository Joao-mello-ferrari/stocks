import { useState } from "react"

import { Header } from '../../components/Header'
import { Resume } from "../../components/Resume"
import { Filters } from "../../components/Filters"
import { Table } from "../../components/Table"
import { RegisterFormModal } from '../../components/RegisterModal'
import { MobileDashBoard } from "../../components/MobileDashboard"

import './styles.scss'

export function Dashboard(){
  const [isResumeClosed, setIsResumeClosed] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [formMethod, setFormMethod] = useState<'POST' | 'PUT'>('POST');
  
  // if(window.innerWidth < 768){
  //   return(
  //     <div className="container">
  //       <Header/>
  //       <MobileDashBoard/>
  //     </div>
  //   )
  // }

  return(
    <div className="container">
      <RegisterFormModal 
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