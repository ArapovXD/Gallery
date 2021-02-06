import React, { useContext, useState, useEffect } from "react"
import { auth, projectFirestore } from "../firebase/config";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(5)
  const [loading, setLoading] = useState(true)

  

  function signup(email, password, cred) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {

      try {
        console.log("USEEEEEEEEEEEEER",user)
        projectFirestore.doc(`users/${user.email}`).get()
        .then(data => {
            console.log("data", data)
            
            const credentials = {
                email: data.data().email,
                password: data.data().password,
                createdAt: data.data().createdAt,
                bio: data.data().bio,
                handle: data.data().handle
            }

            setCurrentUser({
                ...user,
                ...credentials
            })
        })
      } catch {
        setCurrentUser(user)
          
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && (currentUser != 5) && children}
    </AuthContext.Provider>
  )
}