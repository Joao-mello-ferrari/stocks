import { Dispatch, SetStateAction } from 'react';

import Modal from 'react-modal';
import { Form } from '../Form';

import './styles.scss'

Modal.setAppElement('#root');

interface ModalProps{
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>> 
}


export function NewRegisterModal({ open, onClose }:ModalProps){
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
          <h2>Cadastre um novo ativo</h2>
          <Form/>
        </main>
      </Modal>
  )
}
