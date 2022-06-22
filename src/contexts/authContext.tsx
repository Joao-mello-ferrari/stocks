import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import crypto from 'crypto-js';

interface User{
  name: string;
  givenName: string;
  imageUrl: string;
  email: string;
}

interface AuthContext{
  user: User;
  login: (user: User) => void;
  logout: () => void;
  isLogged: () => boolean;
}

interface AuthContenxtProviderProps{
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContext);

export function AuthContenxtProvider({ children }: AuthContenxtProviderProps ){
  const [user, setUser] = useState<User>(()=>{
    const cookies = parseCookies();
    const user = cookies['@stocks:user'];

    if (!!user){
      const bytes = CryptoJS.AES.decrypt(user, import.meta.env.VITE_APP_ENCRYPT_SECRET);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return {} as User;
  })

  const login = useCallback((user: User)=>{
    const encryptedUser = CryptoJS.AES.encrypt(
      JSON.stringify(user), 
        import.meta.env.VITE_APP_ENCRYPT_SECRET
    ).toString();

    setCookie(null, '@stocks:user', encryptedUser, {
      maxAge: 7 * 24 * 60 * 60
    })
    setUser(user);
  },[]);

  const logout = useCallback(()=>{
    destroyCookie(null, '@stocks:user')
    setUser({} as User);
  },[]);

  const isLogged = useCallback(()=>{
    return String(user) !== "{}"
  },[]);

  return(
    <AuthContext.Provider value={{ user, login, logout, isLogged }}>
      { children }
    </AuthContext.Provider>
  )
}

export function useAut(){
  return useContext(AuthContext);
}