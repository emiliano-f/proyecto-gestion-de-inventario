import { createContext, useContext, useState } from 'react';

type AuthData = {
  authenticated: boolean,
  username: string,
  mail: string,
  rol: string,
}

var AuthContext : Context<AuthData>;

/**
 * Provee el contexto de autenticación
 */
export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(
    () : AuthData => ({
      authenticated: false,
      username: "No consultado",
      mail: "No consultado",
      rol: "No consultado",
    })
    );
  AuthContext = createContext({ authData, setAuthData });
  return (
    <AuthContext.Provider value={{ authData }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook que retorna los datos relacionados con la autenticación.
 * @returns Datos relacionados con la autenticación.
 */
export function useAuthData() : AuthData{
  const authData : AuthData = useContext(AuthContext)
  return authData;
}