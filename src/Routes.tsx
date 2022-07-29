import { BrowserRouter, Routes as ReactRoutes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/authContext";

import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";

export function Routes(){
  const { isLogged } = useAuth();
  
  return(
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={ isLogged()
          ? <Navigate to="/dashboard" replace/>
          : <Login/>
        }/>

        <Route path="/dashboard" element={ isLogged()
          ? <Dashboard/>
          : <Navigate to="/" replace/>
        }/>
      </ReactRoutes>
    </BrowserRouter>
  )
}