import { useState } from "react";

import { useRegisters } from "../../contexts/registersContext";

import { Header } from "../../components/Header";
import { Amounts } from "../../components/Amounts";
import { Filters } from "../../components/Filters";
import { Table } from "../../components/Table";
import { RegisterFormModal } from "../../components/RegisterModal";
import { MobileDashBoard } from "../../components/MobileDashboard";

import './styles.scss';

export function Dashboard(){
  const { isRegisterModalOpen } = useRegisters();

  const [isAmountsClosed, setIsAmountsClosed] = useState(false);
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
    <div className="dashboard-container">
      <RegisterFormModal 
        open={isRegisterModalOpen} 
        method={formMethod}
      />
      <Header/>
      <div className="secondary-dashboard-container">

        <Amounts onClose={setIsAmountsClosed} isAmountsCLosed={isAmountsClosed}/>
        <Filters changeFormMethod={setFormMethod} />
        <Table 
          moreRows={isAmountsClosed} 
          changeFormMethod={setFormMethod}
        />
      </div>
    </div>
  )
}