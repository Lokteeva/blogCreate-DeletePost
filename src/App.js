import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    });
  };

  return (
    <Router>
      <nav className="nav">
        <Link to="/">Home</Link>

        {!isAuth ? (
          <Link to="/login">Войти</Link>
        ) : (
          <>
            <Link to="/createpost">CreatePost</Link>
            <button onClick={signUserOut}>Выйти</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>} />
      </Routes>
    </Router>
  );
}

export default App;
