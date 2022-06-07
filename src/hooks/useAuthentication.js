import {db} from "../firebase/config" 

import { backend } from '../backend/config'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  // cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false)

  const auth = getAuth()

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  // Register
  const createUser = async (data) => {
    checkIfIsCancelled()

    setLoading(true)
    setError(null)


    try {

      const {user} = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      
      await updateProfile(user, {
        displayName: data.displayName
      })

      const dataUser = new FormData();
      dataUser.append('uid', user.uid)
      dataUser.append('username', user.displayName)

      /* await fetch('http://localhost:3333/api/users', { */
      await fetch(backend, {
        method: "POST",
        body: dataUser
      })

      setLoading(false)

      return user

    } catch (error) {

      console.log(error.message)
      console.log(typeof error.message)

      let systemErrorMessage

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
      } else if (error.message.includes("email-already")){
        systemErrorMessage = "E-mail já cadastrado."
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
      }

      setLoading(false)
      setError(systemErrorMessage)

    }
  }

  // Logout - sing out
  const logout = () => {
    
    checkIfIsCancelled()
    
    signOut(auth)

  }

  // Login - sing in
  const login = async(data) => {

    checkIfIsCancelled()

    setLoading(true)
    setError(false)

    try {

      await signInWithEmailAndPassword(auth, data.email, data.password)
      setLoading(false)

    } catch (error) {
      let systemErrorMessage

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado."
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta."
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
      }

      setError(systemErrorMessage)
      setLoading(false)

    }

  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login
  }
};