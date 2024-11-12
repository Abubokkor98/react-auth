import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.init";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    // useState for privateRoute
    const [loading, setLoading] = useState(true);

  //for register
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

//   for login
const createSignInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
}
// google login
const SignInWithGoogle = () =>{
    return signInWithPopup(auth, googleProvider);
}

// sign out user
const signOutUser = () =>{
    return signOut(auth);
}

// AuthState
useEffect(()=>{
   const unSubscribe =  onAuthStateChanged(auth, currentUser=>{
        console.log("Current user", currentUser);
        setUser(currentUser);
        setLoading(false);
    })

    return () => {
        unSubscribe;
    }



},[])

  //this is context API
  const authInfo = {
    user,
    loading,
    createUser,
    createSignInUser,
    SignInWithGoogle,
    signOutUser,
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
