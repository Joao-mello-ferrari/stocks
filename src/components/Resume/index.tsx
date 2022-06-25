import { FiArrowDownCircle, FiArrowUpCircle, FiDollarSign } from 'react-icons/fi'

import './styles.scss'

export function Resume(){
  return(
    <section className="resume-container">
      <div className="resume-itens-container">
        <div className="card buy">
          <div className="title">
            <FiArrowUpCircle/>
            <span>Valor comprado</span>
          </div>
          <strong>R$ 1.000,00</strong>
        </div>

        <div className="card sell">
          <div className="title">
            <FiArrowDownCircle/>
            <span>Valor vendido</span>
          </div>
          <strong>R$ 1.000,00</strong>
        </div>

        <div className="card total">
          <div className="title">
            <FiDollarSign/>
            <span>Total em conta</span>
          </div>
          <strong>R$ 1.000,00</strong>
        </div>
      </div>
    </section>
  )
}