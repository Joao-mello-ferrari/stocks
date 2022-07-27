import { Dispatch, SetStateAction } from 'react';
import Modal from 'react-modal';
import { useRegisters } from '../../contexts/registersContext';

import { Form as CreateForm } from '../Form/Create';
import { Form as EditForm } from '../Form/Edit';

import './styles.scss';

Modal.setAppElement('#root');

interface ModalProps{
  open: boolean;
  method: 'POST' | 'PUT'; 
}


export function RegisterFormModal({ open, method }:ModalProps){

  const { storeModalState } = useRegisters();

  if(method === 'POST'){
    return(
      <Modal
        isOpen={open}
        className="modal"
        overlayClassName="overlay"
        // onAfterOpen={afterOpenModal}
        onRequestClose={()=>{storeModalState(false);}}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <main className="modal-content-container">
          <h2>Cadastre um novo ativo</h2>
          <CreateForm />
        </main>
      </Modal>
    )
  }
  
  return(
    <Modal
        isOpen={open}
        className="modal"
        overlayClassName="overlay"
        onRequestClose={()=>{storeModalState(false);}}
        contentLabel="Example Modal"
      >
        <main className="modal-content-container">
          <h2>Edição de ativo</h2>
          <EditForm />
        </main>
      </Modal>
  )
}
