import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from 'react-google-login'

import { useAuth } from '../../contexts/authContext'

import './styles.scss'

export function Login(){
  const { login } = useAuth();

  function onSuccess(r:GoogleLoginResponse | GoogleLoginResponseOffline){
    if('profileObj' in r) {
      login(r.profileObj)
    }
  }

  function onFailure(){
    return
  }

  return(
    <main className="login">
      <section className="mainTextContainer">
        <div className="mainText">
          <strong className="title">
            Controle suas finanças do jeito certo!<br/>
          </strong>
          <span className="description">
            Acesse a plataforma utilizando sua conta Google e começe
            a organizar seus investimentos.
          </span>
          <div className="googleButton">
            <GoogleLogin
              clientId={import.meta.env.VITE_APP_GAPI_CLIENT_ID}
              buttonText='Faça seu login com Google'
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
          </div>
        
        </div>
      </section>
      <section className="mainImageContainer">
        <img src="/src/assets/back.png" alt="Metaphoric people talking about stocks" />
      </section>
    </main>
  )
}