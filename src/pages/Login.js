import React from 'react';
import { Link } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('isAuth', true);
      setIsAuth(true);
      navigate('/');
    });
  };



  return (
    <div className="loginPage">
     
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Войти с помощью Google
      </button>
      <Link to="/loginemail">войти с помощью Email/Password </Link>
    </div>
  );
}

export default Login;
