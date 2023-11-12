import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

// Context created
const userAuthContext = createContext();

// Defining the provider
function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  function logIn(email, password) {
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

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  const updateProfileData = async (profileData) => {
    try {
      await updateProfile(auth.currentUser, profileData);
      // Refresh the user object after the update
      setUser(auth.currentUser);
    } catch (error) {
      throw error;
    }
  };

  async function updateProfileEmail(email) {
    try {
      await updateEmail(auth.currentUser, email);
      // Refresh the user object after the update
      setUser(auth.currentUser);
    } catch (error) {
      throw error;
    }
  }

  async function updateProfilePassword(password) {
    try {
      await updatePassword(auth.currentUser, password);
      // Refresh the user object after the update
      setUser(auth.currentUser);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Wrapping the provider around the children
  return (
    <userAuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        forgotPassword,
        updateProfileData,
        updateProfileEmail,
        updateProfilePassword,
      }}
    >
      {!loading && children}
    </userAuthContext.Provider>
  );
}

// This can be done in every file but to reduce complexity we are doing it once in context file then we will use this function everywhere
function useUserAuth() {
  return useContext(userAuthContext);
}

export { useUserAuth, UserAuthContextProvider };
