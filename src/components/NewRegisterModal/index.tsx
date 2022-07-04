import { Dispatch, SetStateAction } from 'react';

import Modal from 'react-modal';
import { Input } from '../Form/Input';

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
          <h2>Cadastre uma nova ferramenta</h2>
          <form className="modal-form">
            <Input
              name='class'
              label='Classe do ativo'
            />
            <Input
              name='name'
              label='Nome do ativo'
            />
            <Input
              name='amount'
              label='Quantidade'
            />
            <Input
              name='price'
              label='Preço unitário'
            />
            <Input
              name='total'
              label='Total'
            />
            <Input
              name='date'
              label='Data'
              type="date"
            />
          </form>
        </main>
      </Modal>
  )
}
