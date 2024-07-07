import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatApp from './components/ChatApp'; 
import HomePage from './layouts/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/app" element={<ChatApp />} />
    </Routes>
  </Router>
  );
}
export default App;