import { Dispatch, SetStateAction } from 'react';
import Modal from 'react-modal';

import { Form as CreateForm } from '../Form/Create';
import { Form as EditForm } from '../Form/Edit';

import './styles.scss';

Modal.setAppElement('#root');

interface ModalProps{
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  method: 'POST' | 'PUT'; 
}


export function NewRegisterModal({ open, onClose, method }:ModalProps){

  if(method === 'POST'){
    return(
      <Modal
        isOpen={open}
        className="modal"
        overlayClassName="overlay"
        // onAfterOpen={afterOpenModal}
        onRequestClose={()=>{onClose(false);}}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <main className="modal-content-container">
          <h2>Cadastre um novo ativo</h2>
          <CreateForm closeModalByForm={onClose}/>
        </main>
      </Modal>
    )
  }
  
  return(
    <Modal
        isOpen={open}
        className="modal"
        overlayClassName="overlay"
        // onAfterOpen={afterOpenModal}
        onRequestClose={()=>{onClose(false);}}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button> */}
        {/* <div onClick={()=>{onClose(false);}}>I am a modal</div> */}
        <main className="modal-content-container">
          <h2>Edição de ativo</h2>
          <EditForm closeModalByForm={onClose}/>
        </main>
      </Modal>
  )
}
