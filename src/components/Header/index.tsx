import { FiTrendingUp, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../../contexts/authContext'


import './styles.scss'

export function Header(){
  const { user, logout } = useAuth();
// alert(user.imageUrl)
  return(
    <header className="header">
      <div className="logo">
        <FiTrendingUp />
        <div className="logo-text-container">
          <span className="logo-text">Stocks</span>
          <span className="logo-slogan">HANDLE YOUR MONEY</span>
        </div>
      </div>
      <div className="user-container">
        <div className="user-info">
          <span>{user.name}</span>
          <span>{user.email}</span>
        </div>
        <img 
          className="user-avatar"
          src={user.imageUrl}
          alt="Profile picture" 
        />
        <FiLogOut onClick={()=>{ logout() }}/>
      </div>
    </header>
  )
}