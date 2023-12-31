import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { auth } from './firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import LoginEmail from './pages/LoginEmail';
import AdminPage from './pages/AdminPage';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    });
  };

  //admin
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <nav className="nav">
        <Link to="/">Home</Link>
        {!isAuth ? (
          <Link to="/login">Войти </Link>
        ) : (
          <>
            <Link to="/createpost">CreatePost</Link>
            <button onClick={signUserOut}>Выйти</button>
          </>
        )}
        {user && user.uid === `${process.env.REACT_APP_ADMIN}` ? (
          <Link to="/admin">Admin </Link>
        ) : (
          ''
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/loginemail" element={<LoginEmail setIsAuth={setIsAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        {user && user.uid === `${ process.env.REACT_APP_ADMIN}` ? (
          <Route path="/admin" element={<AdminPage setIsAuth={setIsAuth} />} />
        ) : (
          <Route path="/" element={<Home isAuth={isAuth} />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
