import { Link, useLocation } from 'react-router-dom';

import './styles.scss';

export function Navigation(){
  const { pathname } = useLocation();

  function isActive(uri: string):boolean{
    return pathname.includes(uri);
  }

  return(
    <nav className="navigation">
      <Link 
        to="/dashboard"
        className={`${isActive('dashboard') && 'active'}`}
      >
        Dashboard
      </Link>
      
      <Link 
        to="/resume" 
        className={`${isActive('resume') && 'active'}`}
      >
        Resumo
      </Link>

    </nav>
  )
}