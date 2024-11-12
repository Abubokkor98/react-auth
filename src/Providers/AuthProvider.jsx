import React, { createContext, useState } from "react";
import { auth } from "../firebase.init";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
  const name = "Axd Ab";

  //for register
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

//   for login
const createSignInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

// AuthState
// onAuthStateChanged(auth, currentUser=>{
//     if(currentUser){
//         console.log('Currently logged user', currentUser);
//         setUser(currentUser);
//     }
//     else{
//         console.log("No User logged in");
//         setUser(null);
//     }
// })

  //this is context API
  const authInfo = {
    name,
    createUser,
    createSignInUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
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
