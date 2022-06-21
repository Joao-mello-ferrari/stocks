import { gapi } from 'gapi-script'
import { useEffect } from 'react'
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from 'react-google-login'


function App() {

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

  }


  return (
    <div className="App">
      <GoogleLogin
        clientId={import.meta.env.VITE_APP_GAPI_CLIENT_ID}
        buttonText='Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}/>
    </div>
  )
}

export default App


{/* <GoogleLogout
  clientId={import.meta.env.VITE_APP_GAPI_CLIENT_ID}
  buttonText="Logout"
  onSuccess={onSuccess}
/> */}