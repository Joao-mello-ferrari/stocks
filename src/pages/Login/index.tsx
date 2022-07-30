import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";

import { login as loginService } from "../../api/login";
import { useAuth } from "../../contexts/authContext";
import { useToast } from "../../contexts/toastContext";

import { AppError } from "../../errors/AppError";

import "./styles.scss";

export function Login(){
  const { login } = useAuth();
  const { addToast } = useToast();

  async function onSuccess(r:GoogleLoginResponse | GoogleLoginResponseOffline){
    
    if('profileObj' in r) {
      try{
        const user = r.profileObj
        const userRef = await loginService(user);

        addToast({ 
          type: 'success', 
          title: 'Login', 
          message: 'Realizado com sucesso.' 
        });

        login(user);
      }catch(err){
        if(err instanceof AppError){
          const { title, message } = err;
          addToast({ type: 'error', title, message });
        }
        else{
          addToast({ 
            type: 'error', 
            title: 'Login', 
            message: 'Erro ao realizar operação.' 
          });
        }
      }
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
        <img src="/assets/back.png" alt="Metaphoric people talking about stocks" />
      </section>
    </main>
  )
}