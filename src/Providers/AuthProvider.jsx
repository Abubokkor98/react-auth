import React, { createContext } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const authInfo = {
    name: "Axd Ab",
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * 1. create context with null as default
 * 2. create Provider
 * 3. set a value with something (authInfo)
 * 4. use the authProvider in the main.jsx
 * 5. access the children inside the authProvider in the main.jsx
 * 6. export AuthContext
 */
