import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { FiChevronsDown, FiChevronsUp, FiTool, FiXSquare } from 'react-icons/fi';

import { compareNumbers, formatCurrency, formatNumber } from '../../helpers/numbersFormatters';

import { Pagination } from './Pagination'
import { EmptyRows } from './EmptyRows';
import { DefaultContent } from './DefaultContent';

import { useRegisters } from '../../contexts/registersContext';
import { useToast } from '../../contexts/toastContext';
import { compareDates, getDateConverted } from '../../helpers/dateConversion';

import { Register } from '../../interfaces/Register';

import './styles.scss'


interface TableProps{
  moreRows: boolean;
  openRegisterEditForm: (state: boolean) => void;
  changeFormMethod: (method: 'POST' | 'PUT') => void;
}

export function Table({ moreRows, openRegisterEditForm, changeFormMethod }: TableProps){
  const [rowsPerPage, setRowsPerPage] = useState(()=>{
    if(window.innerWidth > 1480 && moreRows) return 10;
    if(window.innerHeight > 1480 && !moreRows) return 6;
    if(moreRows) return 6;
    return 4
  });
  const [emptyRows_RowsPerPage, setEmptyRows_RowsPerPage] = useState(rowsPerPage);

  const [currentPage, setCurrentPage] = useState(0);
  const totalRegisters = 2;

  const [ascendentTotal, setAscendentTotal] = useState(true);
  const [ascendentDate, setAscendentDate] = useState(true);

  const navigationInputRef = useRef() as MutableRefObject<HTMLInputElement>;
  
  const { addToast } = useToast();

  const { 
    storeRegisterToEdit, 
    storeAllRegisters, 
    storeFilteredRegisters,
    filteredRegisters 
  } = useRegisters(); 

  useEffect(()=>{
    storeAllRegisters(registers);
    storeFilteredRegisters(registers);
  },[]);

  useEffect(()=>{
    let newRowsNum = -1;
    
    if(window.innerWidth > 1480 && moreRows) newRowsNum = 9;
    else if(window.innerWidth > 1480 && !moreRows) newRowsNum = 6;
    else if(moreRows) newRowsNum = 6;
    else newRowsNum = 4;
    setRowsPerPage(newRowsNum);

    if(moreRows){
      const delayRowsPerpageChangeForEmptyRows = setTimeout(()=>{
        setEmptyRows_RowsPerPage(newRowsNum);
      },380);
  
      return ()=>{
        clearTimeout(delayRowsPerpageChangeForEmptyRows)
      }
    }
    else setEmptyRows_RowsPerPage(newRowsNum);

  },[moreRows]);
  
  const handleNavigationByInput:React.KeyboardEventHandler<HTMLInputElement> = (e) =>{
   if(e.key === 'Enter'){
    const input = navigationInputRef?.current
    let newPage = Number(input?.value);
    const lastPage = Math.ceil(totalRegisters/rowsPerPage) - 1;
    
    if(! newPage) return;
    if(newPage < 1) newPage = 1;
    else if(newPage > lastPage) newPage = lastPage+1;

    input.value=String(newPage);
    setCurrentPage(newPage-1); 
   }
  }

  function handleRegisterEdit(reg: Register){
    storeRegisterToEdit(reg);
    openRegisterEditForm(true);
    changeFormMethod('PUT'); 
  }

  function getTrHeight(){
    let rowHeight = null;
    if(window.innerWidth > 1480 && moreRows) rowHeight = 2.8;
    else if(window.innerWidth > 1480 && !moreRows) rowHeight = 2.6;
    else if(moreRows) rowHeight = 2.6;
    else rowHeight = 2.8;
    return { height: `${rowHeight}rem` }

  }

  function sort(field: 'total' | 'date', order: 'ascendent' | 'descendent'){
    const sortedRegisters = filteredRegisters.sort((r1, r2)=>{
      if(order === 'ascendent' && field === 'date') return compareDates(r1.date, r2.date)
      if(order === 'descendent' && field === 'date') return compareDates(r2.date, r1.date)
      if(order === 'ascendent' && field === 'total') return compareNumbers(r1.total, r2.total)
      if(order === 'descendent' && field === 'total') return compareNumbers(r2.total, r1.total)
      return 0;
    })
    
    storeFilteredRegisters(sortedRegisters);
  }
  
  const registers = [
    {
      id: '1',
      asset_class: 'Ações',
      name: 'MGLU3',
      amount: 10,
      price: 3,
      total: 30,
      date: '2021-12-12T03:06:28.000Z'
    },
    {
      id: '2',
      asset_class: 'Ações',
      name: 'CASH3',
      amount: 12,
      price: 12000,
      total: 144000,
      date: '2022-12-12T03:06:28.000Z'
    },
  ]

  return(
    <div className="table-container">
      <DefaultContent
        noData={filteredRegisters.length === 0}
        loading={false}
      />

      { filteredRegisters.length > 0 &&
        <table className="table">
          <thead>
            <tr>
              <th>Classe</th>
              <th>Ativo</th>
              <th>Quantidade</th>
              <th>Preço unitário</th>
              <th>
                Preço total
                <FiChevronsUp 
                  className={`${!ascendentTotal && 'rotate'}`} 
                  onClick={()=>{ 
                    sort('total', ascendentTotal ? 'descendent' : 'ascendent') 
                    setAscendentTotal(!ascendentTotal); 
                  }}
                />
                
              </th>
              <th>
                Data
                <FiChevronsUp
                  className={`${!ascendentDate && 'rotate'}`} 
                  onClick={()=>{ 
                    sort('date', ascendentDate ? 'descendent' : 'ascendent') 
                    setAscendentDate(!ascendentDate); 
                  }}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            { filteredRegisters.slice(currentPage, currentPage + rowsPerPage)
              .map((register)=>(
                <tr 
                  key={register.id} 
                  className="table-row"
                  style={getTrHeight()}
                >
                  <td>{register.asset_class}</td>
                  <td>{register.name}</td>
                  <td>{formatNumber(String(register.amount))}</td>
                  <td>{formatCurrency(String(register.price))}</td>
                  <td>{formatCurrency(String(register.total))}</td>
                  <td>{getDateConverted(register.date, true)}</td>
                  <td className="buttons-container empty-row">
                    <FiTool onClick={()=>{handleRegisterEdit(register)}}/>
                    <FiXSquare/>
                  </td>
              </tr>
            ))
            }
            <EmptyRows
              page={currentPage}
              rowsPerPage={emptyRows_RowsPerPage}
              totalRegsCount={filteredRegisters.length}
              rowHeightObject={getTrHeight()}
            />
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6}>
                <div className="table-footer-container">
                  <span className="table-pages">
                  { (currentPage * rowsPerPage) + 1}
                    &nbsp;-&nbsp;
                    { Math.min((currentPage * rowsPerPage) + rowsPerPage, totalRegisters) }
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
                      <input ref={navigationInputRef} type="number" id="page" onKeyDown={handleNavigationByInput}/>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      }
    </div>
  )
}