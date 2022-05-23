import React, { useState, useEffect } from "react";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,getAuth
  } from "firebase/auth";
  import { auth } from "../../firebase";

const AuthContext = React.createContext({
  user: {},
  isLoggedIn:false,
  login: (email,password) => {},
  logout: () => {},
  signup:(email,password)=>{},
  googleSignIn:()=>{}
});



export const AuthContextProvider = (props) => {
    const [user, setUser] = useState();
    let userIsLoggedIn=!!user;
    // const auth = getAuth();
    function logIn(email, password) {
        console.log(email);
        return signInWithEmailAndPassword(auth, email, password);
      }
      function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
      }
      function logOut() {
        return signOut(auth);
      }
      function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
      }
      
      console.log(user);
      userIsLoggedIn = !!user;
      console.log("checking",userIsLoggedIn);

      useEffect(() => {
          
        const unsubscribe =  onAuthStateChanged(auth, (currentuser) => {
          console.log("Auth", currentuser);
          setUser(currentuser);
          
          if(currentuser){
            console.log("checking useeffect",userIsLoggedIn);
          }
          console.log(user)
        });
    
        return () => {
          unsubscribe();
        };
      }, []);
  


  const ContextValue = {
    user: user,
    isLoggedIn:userIsLoggedIn,
    login: logIn,
    logout: logOut,
    signup:signUp,
    googleSignup:googleSignIn
  };
  return (
    <AuthContext.Provider value={ContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
