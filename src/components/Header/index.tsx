import { useGoogleLogout } from "react-google-login";
import { useAuth } from '../../contexts/authContext';

import { FiTrendingUp, FiLogOut } from 'react-icons/fi';
import { Navigation } from "./Navigation";

import './styles.scss';

export function Header(){
  const { user, logout } = useAuth();

  const { signOut } = useGoogleLogout({ 
    clientId: import.meta.env.VITE_APP_GAPI_CLIENT_ID,
    onLogoutSuccess() { logout() },
  });


  return(
    <header className="header">
      <div className="logo">
        <FiTrendingUp />
        <div className="logo-text-container">
          <span className="logo-text">Stocks</span>
          {/* <span className="logo-slogan">HANDLE YOUR MONEY</span> */}
        </div>
      </div>
      
      { window.innerWidth > 768 && <Navigation/> }
      
      <div className="user-container">
        <div className="user-info">
          <span>{user.name}</span>
          <span>{user.email}</span>
        </div>
        <img 
          className="user-avatar"
          src={user.imageUrl}
          alt="Profile picture" 
          referrerPolicy="no-referrer"
        />
        <FiLogOut onClick={()=>{ signOut() }}/>
      </div>
    </header>
  )
}