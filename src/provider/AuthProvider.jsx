import React from "react";
import { useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect } from "react";
import auth from "../firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userProfile = (userDetail) => {
    setLoader(true);
    return updateProfile(auth.currentUser, userDetail);
  };

  const googleLogin = (provider) => {
    return signInWithPopup(auth, provider);
  };

  const logOutUser = () => {
    setLoader(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    googleLogin,
    loginUser,
    setErrorMessage,
    errorMessage,
    registerUser,
    setUser,
    user,
    logOutUser,
    loader,
    userProfile,
    setLoader,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
