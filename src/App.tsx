import { gapi } from 'gapi-script'
import { useEffect } from 'react'

import { AuthContenxtProvider } from './contexts/authContext'
import { RegistersContenxtProvider } from './contexts/registersContext'
import { ToastContextProvider } from './contexts/toastContext'
import { Routes } from "./Routes"

import './styles/App.module.scss'

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
    <AuthContenxtProvider>
      <RegistersContenxtProvider>
        <ToastContextProvider>
          <Routes/>
        </ToastContextProvider>
      </RegistersContenxtProvider>
    </AuthContenxtProvider>
  )
}

export default App


