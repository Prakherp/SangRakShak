import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatApp from './components/ChatApp'; 
import HomePage from './layouts/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import { checkAuthStatus, logOut } from './utils';
import { useNavigate } from 'react-router-dom';
import ChatElement from './components/ChatElement';

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
      navigate("/login");
    }
  };

  function changeIsAuthenticated(value){
    setIsAuthenticated(value);
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/app" element={<ChatApp changeIsAuthenticated={changeIsAuthenticated} handleLogout={handleLogout} />}>
        <Route path=":chatId" element={<ChatElement />}/>
      </Route>
    </Routes>
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