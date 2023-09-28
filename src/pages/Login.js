import React from 'react'
import {auth, provider} from '../firebase'
import { signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Login({ setIsAuth }) {
  let navigate = useNavigate()

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    })
  }
  return (
    <div className='loginPage'>
      <h1>Войти с помощью Google</h1>
      <button className='login-with-google-btn' onClick={signInWithGoogle}>Войти с помощью Google</button>
    </div>
  )
}

export default Login
