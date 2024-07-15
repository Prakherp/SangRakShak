import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {NavBar} from './components/NavBar';
import {Home} from './components/Home';
import { SignIn } from './components/SignIn';
import { SignUp } from "./components/SignUp";
import React,{ useEffect} from 'react';
import { InsidePage } from './components/InsidePage';
import { checkAuthStatus, logOut } from './utils';
import { useNavigate } from 'react-router-dom';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const authStatus = await checkAuthStatus();
      setIsAuthenticated(authStatus);
    };
    fetchAuthStatus();
  }, []);

  const handleLogout = async () => {
    const result = await logOut();
    if(result.success){
      setIsAuthenticated(false);
      navigate("/signin");
    }
    
  };

  function changeIsAuthenticated(value){
    setIsAuthenticated(value);
  }

  return (
    <div className="App">
        <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/inside" element={<InsidePage changeIsAuthenticated={changeIsAuthenticated} />} />
          <Route path="*" element={<Home />} />
        </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
