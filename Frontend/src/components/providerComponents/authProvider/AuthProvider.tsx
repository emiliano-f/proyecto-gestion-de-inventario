import { createContext, useContext, useState } from 'react';

export var AuthContext;

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState({
    authenticated: false,
    username: "No consultado",
    mail: "No consultado",
    rol: "No consultado",
  });
  AuthContext = createContext({ authData, setAuthData });
  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}