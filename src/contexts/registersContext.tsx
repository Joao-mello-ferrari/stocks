import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import crypto from 'crypto-js';

import { Register } from '../interfaces/Register';


interface RegistersContext{
  allRegisters: Register[];
  filteredRegisters: Register[];
  registerToEdit: Register;
  storeAllRegisters: (registers: Register[]) => void;
  storeFilteredRegisters: (registers: Register[]) => void;
  storeRegisterToEdit: (register: Register) => void;
}

interface ResgistersContextProviderProps{
  children: ReactNode;
}

const RegistersContext = createContext({} as RegistersContext);

export function RegistersContenxtProvider({ children }: ResgistersContextProviderProps ){
  const [allRegisters, setAllRegisters] = useState<Register[]>([]);
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

  const storeAllRegisters = useCallback((registers: Register[])=>{
    // const encryptedRegister = crypto.AES.encrypt(
    //   JSON.stringify(register), 
    //     import.meta.env.VITE_APP_ENCRYPT_SECRET
    // ).toString();

    // setCookie(null, '@stocks:register_to_edit', encryptedRegister, {
    //   maxAge: 7 * 24 * 60 * 60
    // })
    setAllRegisters(registers);
  },[]);

  const storeFilteredRegisters = useCallback((registers: Register[])=>{
    // const encryptedRegister = crypto.AES.encrypt(
    //   JSON.stringify(register), 
    //     import.meta.env.VITE_APP_ENCRYPT_SECRET
    // ).toString();

    // setCookie(null, '@stocks:register_to_edit', encryptedRegister, {
    //   maxAge: 7 * 24 * 60 * 60
    // })
    setFilteredRegisters(registers);
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
        allRegisters,
        filteredRegisters,
        registerToEdit,
        storeAllRegisters, 
        storeFilteredRegisters, 
        storeRegisterToEdit 
    }}>
      { children }
    </RegistersContext.Provider>
  )

}

export function useRegisters(){
  return useContext(RegistersContext);
}