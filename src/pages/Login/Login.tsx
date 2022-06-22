import { gapi } from 'gapi-script'
import { useEffect } from 'react'
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from 'react-google-login'


import styles from './Login.module.scss'

export function Login(){
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId:import.meta.env.VITE_APP_GAPI_CLIENT_ID,
        scope: ""
      })

    }
    gapi.load('client:auth2', start)
    // console.log(gapi.auth.getToken().access_token)
  })

  function onSuccess(r:GoogleLoginResponse | GoogleLoginResponseOffline){
    // if(r instanceof GoogleLoginResponse)
    // if(r.includes())
    if('profileObj' in r) console.log(r.profileObj)
    // console.log(r?.profileObj)
  }
  function onFailure(){
    // CryptoJS.AES.encrypt("Message", "My Secret Passphrase");
  }

  return(
    <main className={styles.login}>
      <section className={styles.mainTextContainer}>
        <div className={styles.mainText}>
          <strong className={styles.title}>
            Controle suas finanças do jeito certo!<br/>
          </strong>
          <span className={styles.description}>
            Acesse a plataforma utilizando sua conta Google e começe
            a organizar seus investimentos
          </span>
          <div className={styles.googleButton}>
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
      <section className={styles.mainImageContainer}>
        <img src="/src/assets/back.png" alt="Metaphoric people talking about stocks" />
      </section>
    </main>
  )
}