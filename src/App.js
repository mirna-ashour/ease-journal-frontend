import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Categories from './Components/Categories';
import Users from './Components/Users';
import Journals from './Components/Journals';
import Login from './Components/Login';
import Register from './Components/Register';
import Logo from './EaseJournalLOGO_V1_vector.png'; // Import the logo

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <div className="logo-container" style={{ textAlign: 'center', margin: '2rem 0' }}>
        <img src={Logo} alt="Ease Journal Logo" style={{ maxWidth: '200px' }} />
      </div>
      <Routes>
        <Route path="" element={ <Login/> } />
        <Route path="categories" element={ <Categories/> } />
        <Route path="users" element={ <Users/> } />
        <Route path="journals" element={ <Journals/> } />
        <Route path="register" element={ <Register/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
