import { useAuth } from "../../contexts/authContext"

import { Header } from '../../components/Header'
import { Resume } from "../../components/Resume"
import { Filters } from "../../components/Filters"

import './styles.scss'

export function Dashboard(){
  return(
    <div className="container">
      <Header/>
      <Resume/>
      <Filters/>
      
    </div>
  )
}