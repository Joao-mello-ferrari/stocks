import { BrowserRouter, Routes as ReactRoutes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/authContext";

import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Resume } from "./pages/Resume";
import { AveragePrice } from "./pages/AveragePrice";

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

        <Route path="/resume" element={ isLogged()
          ? <Resume/>
          : <Navigate to="/" replace/>
        }/>

        <Route path="/average-price" element={ isLogged()
          ? <AveragePrice/>
          : <Navigate to="/" replace/>
        }/>
      </ReactRoutes>
    </BrowserRouter>
  )
}