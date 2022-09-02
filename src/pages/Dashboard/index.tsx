import { useState } from "react";

import { useRegisters } from "../../contexts/registersContext";

import { Header } from "../../components/Header";
import { Resume } from "../../components/Resume";
import { Filters } from "../../components/Filters";
import { Table } from "../../components/Table";
import { RegisterFormModal } from "../../components/RegisterModal";
import { MobileDashBoard } from "../../components/MobileDashboard";

import './styles.scss';

export function Dashboard(){
  const { isRegisterModalOpen } = useRegisters();

  const [isResumeClosed, setIsResumeClosed] = useState(false);
  const [formMethod, setFormMethod] = useState<'POST' | 'PUT'>('POST');
  
  if(window.innerWidth < 768){
    return(
      <div className="container">
        <Header/>
        <MobileDashBoard/>
      </div>
    )
  }

  return(
    <div className="container">
      <RegisterFormModal 
        open={isRegisterModalOpen} 
        method={formMethod}
      />
      <Header/>
      <div className="secondary-container">

        <Resume onClose={setIsResumeClosed} isResumeCLosed={isResumeClosed}/>
        <Filters changeFormMethod={setFormMethod} />
        <Table 
          moreRows={isResumeClosed} 
          changeFormMethod={setFormMethod}
        />
      </div>
    </div>
  )
}