import { MutableRefObject, useEffect, useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useRegisters } from '../../contexts/registersContext';
import { useToast } from '../../contexts/toastContext';
import { useAuth } from '../../contexts/authContext';
import { loadRegisters } from '../../api/loadRegisters';
import { compareNumbers, formatCurrency, formatNumber } from '../../helpers/numbersFormatters';
import { compareDates, getDateConverted } from '../../helpers/dateConversion';

import { Pagination } from './Pagination';
import { EmptyRows } from './EmptyRows';
import { DefaultContent } from './DefaultContent';
import { ActionTypeRow } from './ActionTypeRow';
import { FiChevronsUp, FiTool, FiXSquare } from 'react-icons/fi';

import { Register } from '../../interfaces/Register';
import { AppError } from '../../errors/AppError';
import { deleteRegister } from '../../api/deleteRegister';

import './styles.scss';

interface TableProps{
  moreRows: boolean;
  changeFormMethod: (method: 'POST' | 'PUT') => void;
}

export function Table({ moreRows, changeFormMethod }: TableProps){
  const { user } = useAuth();
  
  const { data, isLoading, error } = useQuery(
    'loadRegisters', 
    async () => await loadRegisters(user?.email), 
    { staleTime: Infinity }
  );
  
  const queryClient = useQueryClient();
  const { mutate: deleteQuery, isLoading: isDeleting } = useMutation(
    (ref: Register["ref"])=>handleDeleteRegister(ref),
    {
      onSuccess: (reg: Register | undefined) => {
        if(reg !== undefined){
          addToast({ 
            type: 'success', 
            title: 'Deleção', 
            message: `Ativo ${reg.name} deletado com sucesso.` 
          });
          queryClient.invalidateQueries('loadRegisters')
        }
      },
      onError: (err) => {
        if(err instanceof AppError){
          const { title, message } = err;
          addToast({ type: 'error', title, message });
        }
        else{
          addToast({ 
            type: 'error', 
            title: 'Deleção', 
            message: 'Erro ao realizar operação.' 
          });
        }
      }
    }
  );

  const [rowsPerPage, setRowsPerPage] = useState(()=>{
    if(window.innerWidth > 1480 && moreRows) return 10;
    if(window.innerHeight > 1480 && !moreRows) return 6;
    if(moreRows) return 6;
    return 4
  });
  const [emptyRows_RowsPerPage, setEmptyRows_RowsPerPage] = useState(rowsPerPage);

  const [currentPage, setCurrentPage] = useState(0);
  const [filteredRegisterCount, setFilteredRegisterCount] = useState(0);

  const [ascendentTotal, setAscendentTotal] = useState(true);
  const [ascendentDate, setAscendentDate] = useState(true);

  const navigationInputRef = useRef() as MutableRefObject<HTMLInputElement>;
  
  const { addToast } = useToast();

  const { 
    storeRegisterToEdit, 
    storeFilteredRegisters,
    filteredRegisters,
    storeModalState 
  } = useRegisters(); 

  useEffect(()=>{
    if(data !== undefined){
      if(data.length === 0)
        addToast({ 
          type: 'warning', 
          title: 'Busca', 
          message: 'Não foram encontrados dados.' 
        });
      
      storeFilteredRegisters(data);
    }
    
    else if(error !== null){
      if(error instanceof AppError){
        const { title, message } = error;
        addToast({ type: 'error', title, message });
      }
      else{
        addToast({ 
          type: 'error', 
          title: 'Busca', 
          message: 'Erro ao realizar operação.' 
        });
      }
    }

  },[data, error]);

  useEffect(()=>{
    setFilteredRegisterCount(filteredRegisters.length);
  },[filteredRegisters]);

  useEffect(()=>{
    let newRowsNum = -1;
    
    if(window.innerWidth > 1480 && moreRows) newRowsNum = 9;
    else if(window.innerWidth > 1480 && !moreRows) newRowsNum = 6;
    else if(moreRows) newRowsNum = 6;
    else newRowsNum = 4;
    setRowsPerPage(newRowsNum);

    if(newRowsNum > rowsPerPage){
      const baseCurrentPage = Math.floor(filteredRegisters.length/newRowsNum);
      const newCurrentPage = Math.max(0,baseCurrentPage-1);
      setCurrentPage(newCurrentPage);
    } 

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
    const lastPage = Math.ceil(filteredRegisterCount/rowsPerPage) - 1;
    
    if(! newPage) return;
    if(newPage < 1) newPage = 1;
    else if(newPage > lastPage) newPage = lastPage+1;

    input.value=String(newPage);
    setCurrentPage(newPage-1); 
   }
  }

  function handleEditRegister(reg: Register){
    storeRegisterToEdit(reg);
    storeModalState(true);
    changeFormMethod('PUT'); 
  }
  
  async function handleDeleteRegister(ref: Register["ref"]){
    const shouldReallyDelete = confirm("Deseja realmente excluir?");
    if(!shouldReallyDelete) return;

    return await deleteRegister(ref);
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

  return(
    <div className="table-container">
      <DefaultContent
        noData={filteredRegisters.length === 0}
        loading={isLoading}
      />

      { filteredRegisters.length > 0 &&
        <table className="table">
          <thead>
            <tr>
              <th style={{width: '15%'}}>Classe</th>
              <th style={{width: '10%'}}>Ativo</th>
              <th style={{width: '10%'}}>Operação</th>
              <th style={{width: '15%'}}>Quantidade</th>
              <th style={{width: '15%'}}>Preço unitário</th>
              <th style={{width: '20%'}}>
                Preço total
                <FiChevronsUp 
                  className={`${!ascendentTotal && 'rotate'}`} 
                  onClick={()=>{ 
                    sort('total', ascendentTotal ? 'descendent' : 'ascendent') 
                    setAscendentTotal(!ascendentTotal); 
                  }}
                />
                
              </th>
              <th style={{width: '15%'}}>
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
            { filteredRegisters
              .slice(currentPage*rowsPerPage, currentPage*rowsPerPage + rowsPerPage)
              .map((register)=>(
                <tr 
                  key={register.ref.value.id} 
                  className="table-row"
                  style={getTrHeight()}
                >
                  <td>{register.asset_class}</td>
                  <td>{register.name}</td>
                  <ActionTypeRow type={register.action_type} />
                  <td>{formatNumber(String(register.amount))}</td>
                  <td>{formatCurrency(String(register.price))}</td>
                  <td>{formatCurrency(String(register.total))}</td>
                  <td>{getDateConverted(register.date, true)}</td>
                  <td className="buttons-container empty-row">
                    <FiTool onClick={()=>{handleEditRegister(register)}}/>
                    <FiXSquare onClick={()=>{deleteQuery(register.ref)}}/>
                  </td>
              </tr>
            ))
            }
            <EmptyRows
              page={currentPage}
              rowsPerPage={emptyRows_RowsPerPage}
              totalRegsCount={filteredRegisters.length}
              rowHeightObject={getTrHeight()}
              span={7}
            />
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7}>
                <div className="table-footer-container">
                  <span className="table-pages">
                  { (currentPage * rowsPerPage) + 1}
                    &nbsp;-&nbsp;
                    { Math.min((currentPage * rowsPerPage) + rowsPerPage, filteredRegisterCount) }
                    &nbsp;de&nbsp;
                    { filteredRegisterCount } 
                  </span>
                  <div className="table-navigation-container">
                    <div className="table-navigation-buttons">
                      <Pagination
                        page={currentPage+1}
                        total={filteredRegisterCount}
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