import { Buttons } from './Buttons'
import './styles.scss'

export function Table(){
  // const a = [1,2,3,4,5,6,7,8,9,10]
  const a = [1,2,3,4,5]

  return(
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Classe</th>
            <th>Ativo</th>
            <th>Quantidade</th>
            <th>Preço unitário</th>
            <th>Preço total</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          { a.map((item)=>(
              <tr key={item}>
              <td>sdsdsd</td>
              <td>sdsdsdsdsds</td>
              <td>sdsdsdsdsds</td>
              <td>sdsdsdsdsds</td>
              <td>sdsdsdsdsds</td>
              <td>sdsdsdsdsds</td>
            </tr>
          ))
        }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>
              <div className="table-footer-container">
                <span className="table-pages">1 - 5 de 20</span>
                <div className="table-navigation-container">
                  <div className="table-navigation-buttons">
                    <Buttons/>
                  </div>
                  <div className="table-navigation-input">
                    <label htmlFor="page">
                      Ir até a página
                    </label>
                    <input type="number" id="page"/>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

{/* <span className="table-pages">1 - 5 de 20</span>
              <div className="table-navigation-container">
                <div className="table-navigation-buttons">
                  <button>1</button>
                  <button>2</button>
                  <button>3</button>
                  <button>4</button>
                </div>
                <div className="table-navigation-input">
                  <label htmlFor="page">
                    Ir até a página
                  </label>
                  <input type="text" id="page"/>
                </div>
              </div> */}