import { createContext, useContext, useState } from 'react';

type AuthData = {
  id: number,
  authenticated: boolean,
  username: string,
  email: string,
  rol: string
}


const getInitialState = () : any => {
  var authData = sessionStorage.getItem("authData");
  if(authData === null){
    authData = {
      id:-1,
      authenticated: false,
      username: "No consultado",
      email: "No consultado",
      rol: "No consultado"
    }
  }else{
    authData = JSON.parse(authData)
  }
  return authData;
}

var AuthContext : Context<AuthData>;

/**
 * Provee el contexto de autenticación
 */
export function AuthProvider({ children }) {
  
  const [authData, setstateAuthData] = useState(getInitialState());
  const setAuthData = (authData: AuthData) => {
    sessionStorage.setItem("authData",JSON.stringify(authData))
    setstateAuthData(authData);
  }

  AuthContext = createContext([authData, setAuthData]);
  return (
    <AuthContext.Provider value={[authData, setAuthData]}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook que retorna los datos relacionados con la autenticación.
 * @returns Datos relacionados con la autenticación.
 */
export function useAuthData() : [AuthData,(authData: AuthData) => void]{
  return useContext(AuthContext);
}