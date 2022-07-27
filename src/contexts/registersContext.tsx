import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import crypto from 'crypto-js';

import { Register } from '../interfaces/Register';


interface RegistersContext{
  filteredRegisters: Register[];
  registerToEdit: Register;
  isRegisterModalOpen: boolean;
  storeFilteredRegisters: (registers: Register[]) => void;
  storeRegisterToEdit: (register: Register) => void;
  storeModalState: (state: boolean) => void;
}

interface ResgistersContextProviderProps{
  children: ReactNode;
}

const RegistersContext = createContext({} as RegistersContext);

export function RegistersContenxtProvider({ children }: ResgistersContextProviderProps ){
  const [filteredRegisters, setFilteredRegisters] = useState<Register[]>([]);
  
  const [registerToEdit, setRegisterToEdit] = useState<Register>(()=>{
    const cookies = parseCookies();
    const register = cookies['@stocks:register_to_edit'];

    if (!!register){
      const bytes = crypto.AES.decrypt(register, import.meta.env.VITE_APP_ENCRYPT_SECRET);
      return JSON.parse(bytes.toString(crypto.enc.Utf8));
    }
    return {} as Register;
  })

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(()=>{
    const cookies = parseCookies();
    const state = cookies['@stocks:modal_state'];

    if (state !== null && state !== undefined){
      const bytes = crypto.AES.decrypt(state, import.meta.env.VITE_APP_ENCRYPT_SECRET);
      return JSON.parse(bytes.toString(crypto.enc.Utf8)).state;
    }
    return false;
  })

  const storeFilteredRegisters = useCallback((registers: Register[])=>{
    setFilteredRegisters(registers);
  },[]);

  const storeModalState = useCallback((state: boolean)=>{
    const encryptedState = crypto.AES.encrypt(
      JSON.stringify({ state }), 
        import.meta.env.VITE_APP_ENCRYPT_SECRET
    ).toString();

    setCookie(null, '@stocks:modal_state', encryptedState, {
      maxAge: 7 * 24 * 60 * 60
    })
    setIsRegisterModalOpen(state);
  },[]);

  const storeRegisterToEdit = useCallback((register: Register)=>{
    const encryptedRegister = crypto.AES.encrypt(
      JSON.stringify(register), 
        import.meta.env.VITE_APP_ENCRYPT_SECRET
    ).toString();

    setCookie(null, '@stocks:register_to_edit', encryptedRegister, {
      maxAge: 7 * 24 * 60 * 60
    })
    setRegisterToEdit(register);
  },[]);

  return(
    <RegistersContext.Provider 
      value={{ 
        filteredRegisters,
        registerToEdit,
        isRegisterModalOpen, 
        storeFilteredRegisters, 
        storeRegisterToEdit,
        storeModalState
    }}>
      { children }
    </RegistersContext.Provider>
  )

}

export function useRegisters(){
  return useContext(RegistersContext);
}