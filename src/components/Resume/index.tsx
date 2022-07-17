import { FiArrowDownCircle, FiArrowUpCircle, FiChevronDown, FiDollarSign, FiX } from 'react-icons/fi'

import './styles.scss'

interface ResumeProps{
  isResumeCLosed: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Resume({ isResumeCLosed, onClose }: ResumeProps){

  return(
    <section className={
      `resume-container
      ${ isResumeCLosed ? 'resume-container-tighten' : '' }`
    }>
      <div 
        className={
          `resume-itens-container
          ${ isResumeCLosed ? 'resume-itens-container-tighten' : ''}
        `}>
          
        <div className={
          `card buy 
          ${ isResumeCLosed ? 'card-translate-y' : ''}`
        }>
          <div className="title">
            <FiArrowDownCircle/>
            <span>Valor comprado</span>
          </div>
          <strong>R$ 1.000,00</strong>
        </div>

        <div className={
          `card sell 
          ${ isResumeCLosed ? 'card-translate-y' : ''}`
        }>
          <div className="title">
            <FiArrowUpCircle/>
            <span>Valor vendido</span>
          </div>
          <strong>R$ 1.000,00</strong>
        </div>

        <div className={
          `card 
          ${ isResumeCLosed ? 'card-translate-y' : ''}`
        }>
          <div className="title">
            <FiDollarSign/>
            <span>Total em conta</span>
          </div>
          <strong>R$ 1.000,00</strong>
        </div>

        { isResumeCLosed
          ? <FiChevronDown className="close-icon" onClick={()=>{ onClose(false); }}/>
          : <FiX className="close-icon" onClick={()=>{ onClose(true); }}/>
        }
      </div>
    </section>
  )
}