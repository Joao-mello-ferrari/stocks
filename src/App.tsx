import { Login } from "./pages/Login/Login"

import styles from './styles/App.module.scss'

function App() {

  return (
    <div className={styles.container}>
      <Login/>
    </div>
  )
}

export default App


{/* <GoogleLogout
  clientId={import.meta.env.VITE_APP_GAPI_CLIENT_ID}
  buttonText="Logout"
  onSuccess={onSuccess}
/> */}