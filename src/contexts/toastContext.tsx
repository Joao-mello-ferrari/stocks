import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { ToastsContainer } from "../components/Toasts";

import { Toast } from "../interfaces/Toast";

import { v4 } from 'uuid';

interface ToastContext{
  addToast: (data: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

interface ToastContextProviderProps{
  children: ReactNode;
}

const ToastContext = createContext<ToastContext>({} as ToastContext);

export function ToastContextProvider({ children }: ToastContextProviderProps){
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((newToast: Omit<Toast, 'id'>) =>{
    const toast = { ...newToast, id: v4() };
    setToasts(current => [...current, toast]);
  },[])

  const removeToast = useCallback((id: string) =>{
    const filteredToasts = toasts.filter((t)=> t.id !== id)
    setToasts(filteredToasts);
  },[]);
  
  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastsContainer toasts={toasts}/>
      { children }
    </ToastContext.Provider>
  );
};

export function useToast(){
  const context = useContext(ToastContext);
  return context;
};
