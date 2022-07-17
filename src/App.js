import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Error404 from './pages/Error404';
import { useState } from 'react';
import {auth} from './firebase-config';
import { signOut } from 'firebase/auth';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    })
  }

  return (
    <div className="App">
      {/* For some reason Link does not work */}
      {/* Uncaught Error: useHref() may be used only in the context of a <Router> component. */}
      <nav>
        {/* <Link to="/"> Home </Link>
        <Link to="/createpost"> Create Post </Link>
        <Link to="/login"> Login </Link> */}

        <a href='/'> Home </a>
        {!isAuth ? (
          <a href='/login'> Login </a>
        ) : (
          <>
            <a href='/createpost'> Create Post </a>
            <button onClick={signUserOut}>Logout</button>
          </>
        )}
      </nav>
      <Router>
        {/* <a href="/home">Go to Home page</a> */}
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />} />
          <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
