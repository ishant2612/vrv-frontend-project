// import React, { createContext, useContext, useState, useEffect } from "react";
// import {
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   onAuthStateChanged,
//   createUserWithEmailAndPassword,
//   updateProfile,
//   sendPasswordResetEmail,
// } from "firebase/auth";
// import { auth, googleProvider } from "../config/firebase";
// import { api } from "../services/api";
// import { FirebaseError } from "firebase/app";

// const AuthContext = createContext(null);

// function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [userRoles, setUserRoles] = useState([]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       try {
//         if (user) {
//           const userData = await api.getUserByEmail(user.email);
//           setUserRoles(userData?.roles || []);
//         } else {
//           setUserRoles([]);
//         }
//         setCurrentUser(user);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const getFirebaseErrorMessage = (error) => {
//     if (error instanceof FirebaseError) {
//       switch (error.code) {
//         case "auth/user-not-found":
//           return "No account found with this email";
//         case "auth/wrong-password":
//           return "Incorrect password";
//         case "auth/email-already-in-use":
//           return "Email already in use";
//         case "auth/weak-password":
//           return "Password should be at least 6 characters";
//         case "auth/invalid-email":
//           return "Invalid email address";
//         case "auth/popup-closed-by-user":
//           return "Google sign-in was cancelled";
//         default:
//           return error.message;
//       }
//     }
//     return error.message;
//   };

//   const login = async (email, password) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const userData = await api.getUserByEmail(email).catch(() => null);

//       if (!userData) {
//         // If user exists in Firebase but not in our DB, create them
//         await api.createUser({
//           email: userCredential.user.email,
//           username: userCredential.user.email,
//           fullName: userCredential.user.displayName || email.split("@")[0],
//           status: "active",
//           roles: ["admin"], // Default role
//         });
//       }
//       return { user: userCredential.user, roles: userData?.roles || ["user"] };
//     } catch (error) {
//       throw new Error(getFirebaseErrorMessage(error));
//     }
//   };

//   const loginWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       let userData = await api
//         .getUserByEmail(result.user.email)
//         .catch(() => null);

//       if (!userData) {
//         // If first time Google sign-in, create user in our DB
//         userData = await api.createUser({
//           email: result.user.email,
//           username: result.user.email,
//           fullName: result.user.displayName || result.user.email.split("@")[0],
//           status: "active",
//           roles: ["admin"], // Default role
//         });
//       }
//       return { user: result.user, roles: userData.roles };
//     } catch (error) {
//       throw new Error(getFirebaseErrorMessage(error));
//     }
//   };

//   const logout = () => {
//     return signOut(auth);
//   };

//   const signup = async (email, password, fullName) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       await updateProfile(userCredential.user, {
//         displayName: fullName,
//       });

//       // Create user in our DB
//       await api.createUser({
//         email,
//         username: email,
//         fullName,
//         status: "active",
//         roles: ["admin"], // Default role
//       });

//       return userCredential;
//     } catch (error) {
//       throw new Error(getFirebaseErrorMessage(error));
//     }
//   };

//   const resetPassword = async (email) => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//     } catch (error) {
//       throw error;
//     }
//   };

//   const value = {
//     currentUser,
//     userRoles,
//     login,
//     loginWithGoogle,
//     logout,
//     signup,
//     isAdmin: userRoles.includes("admin"),
//     resetPassword,
//   };

//   if (loading) {
//     return null; // or a loading spinner
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }

// export { AuthProvider, useAuth };

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { api } from "../services/api";
import { FirebaseError } from "firebase/app";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userData = await api.getUserByEmail(user.email);
          if (userData) {
            setUserRoles(userData?.roles || []);
          } else {
            setUserRoles([]);
          }
        } else {
          setUserRoles([]);
        }
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserRoles([]);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const getFirebaseErrorMessage = (error) => {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          return "No account found with this email";
        case "auth/wrong-password":
          return "Incorrect password";
        case "auth/email-already-in-use":
          return "Email already in use";
        case "auth/weak-password":
          return "Password should be at least 6 characters";
        case "auth/invalid-email":
          return "Invalid email address";
        case "auth/popup-closed-by-user":
          return "Google sign-in was cancelled";
        default:
          return error.message;
      }
    }
    return error.message;
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      let userData = await api.getUserByEmail(email).catch(() => null);

      if (!userData) {
        // If user exists in Firebase but not in our DB, create them
        userData = await api.createUser({
          email: userCredential.user.email,
          username: userCredential.user.email,
          fullName: userCredential.user.displayName || email.split("@")[0],
          status: "active",
          roles: ["admin"], // Default role
        });
      }

      setUserRoles(userData?.roles || ["user"]);
      return { user: userCredential.user, roles: userData?.roles || ["user"] };
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      let userData = await api
        .getUserByEmail(result.user.email)
        .catch(() => null);

      if (!userData) {
        // If first time Google sign-in, create user in our DB
        userData = await api.createUser({
          email: result.user.email,
          username: result.user.email,
          fullName: result.user.displayName || result.user.email.split("@")[0],
          status: "active",
          roles: ["admin"], // Default role
        });
      }

      setUserRoles(userData.roles); // Update roles after successful login
      return { user: result.user, roles: userData.roles };
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const signup = async (email, password, fullName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      // Create user in our DB
      await api.createUser({
        email,
        username: email,
        fullName,
        status: "active",
        roles: ["admin"], // Default role
      });

      setUserRoles(["admin"]); // Set default role for new users
      return userCredential;
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    currentUser,
    userRoles,
    login,
    loginWithGoogle,
    logout,
    signup,
    isAdmin: userRoles.includes("admin"),
    resetPassword,
  };

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or custom loader
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
