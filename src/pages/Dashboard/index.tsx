import { GoogleLogout } from "react-google-login";
import { useAuth } from "../../contexts/authContext"

export function Dashboard(){
  const { logout } = useAuth();


  return(
     <GoogleLogout
      clientId={import.meta.env.VITE_APP_GAPI_CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={()=>{logout()}}
    /> 
  )
}