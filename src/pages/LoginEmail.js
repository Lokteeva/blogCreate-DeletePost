import React, { useState } from 'react';
import { auth, database } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function LoginEmail({ setIsAuth }) {
  const [login, setLogin] = useState(false);

  const navigate = useNavigate();

  const handlSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (type === 'signup') {
      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, 'authData');
          navigate('/');
        })
        .catch((err) => {
          alert(err.code);
          setLogin(true);
        });
    } else {
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, 'authData');
          navigate('/');
        })
        .catch((err) => {
          alert(err.code);
        });
    }
  };

    //проверяем, вошел пользователь или вышел(видео net Ninja)
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('пользователь вошел в систему: ', user);
        localStorage.setItem('isAuth', true);
        setIsAuth(true);
      } else {
        console.log('пользователь вышел из системы');
      }
    });
  

  return (
    <div>
      <h1>{login ? 'Вход' : 'Регистрация'}</h1>
      <form onSubmit={(e) => handlSubmit(e, login ? 'signin' : 'signup')}>
        <input name="email" placeholder="Email" />
        <input name="password" placeholder="Password" />
        <button>{login ? 'Вход' : 'Регистрация'}</button>
      </form>
    </div>
  );
}

export default LoginEmail;
