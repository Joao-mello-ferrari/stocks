import { useEffect, useState } from 'react';
import { Pagination } from './Pagination'
import './styles.scss'

interface TableProps{
  moreRows: boolean;
}

export function Table({ moreRows }: TableProps){
  const [rowsPerPage, setRowsPerPage] = useState(()=>{
    if(window.innerWidth > 1480 && moreRows) return 10;
    if(window.innerHeight > 1480 && !moreRows) return 6;
    if(moreRows) return 6;
    return 4
  });

  const [currentPage, setCurrentPage] = useState(0);
  const totalRegisters = 20

  useEffect(()=>{
    let newRowsNum = null;
    if(window.innerWidth > 1480 && moreRows) newRowsNum = 10;
    if(window.innerHeight > 1480 && !moreRows) newRowsNum = 6;
    if(moreRows) newRowsNum = 6;
    else newRowsNum = 4
    setRowsPerPage(newRowsNum);
  },[moreRows])

  

  // const a = [1,2,3,4,5,6,7,8,9,10]
  const a = [1,2,3,4,6,7,8,9,10]

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
          { a.slice(currentPage, currentPage + rowsPerPage)
            .map((item)=>(
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
                <span className="table-pages">
                { (currentPage * rowsPerPage) + 1}
                  &nbsp;-&nbsp;
                  { (currentPage * rowsPerPage) + rowsPerPage }
                  &nbsp;de&nbsp;
                  { totalRegisters } 
                </span>
                <div className="table-navigation-container">
                  <div className="table-navigation-buttons">
                    <Pagination
                      page={currentPage+1}
                      total={totalRegisters}
                      rowsPerPage={rowsPerPage}
                      onNavigate={setCurrentPage}
                    />
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