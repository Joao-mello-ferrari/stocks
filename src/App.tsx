import { gapi } from 'gapi-script'
import { useEffect } from 'react'

import { AuthContenxtProvider } from './contexts/authContext'
import { RegistersContenxtProvider } from './contexts/registersContext'
import { ToastContextProvider } from './contexts/toastContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes } from "./Routes"

import './styles/App.module.scss'

const queryClient = new QueryClient();

function App() {
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId:import.meta.env.VITE_APP_GAPI_CLIENT_ID,
        apiKey: import.meta.env.VITE_APP_GAPI_API_KEY,
        scope: "profile"
      })
    }
    gapi.load('client:auth2', start)
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContenxtProvider>
        <RegistersContenxtProvider>
          <ToastContextProvider>
            <Routes/>
          </ToastContextProvider>
        </RegistersContenxtProvider>
      </AuthContenxtProvider>
    </QueryClientProvider>
  )
}

export default App


