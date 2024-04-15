import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';
import Navbar from './Components/Navbar';
import Categories from './Components/Categories';
import Users from './Components/Users';
import Journals from './Components/Journals';
import Login from './Components/Login';
import Register from './Components/Register';
import Logo from './EaseJournalLOGO_V1_vector.png';

function HomePage({ profile }) {
  const navigate = useNavigate();

  const logOut = () => {
    Cookies.remove('auth');
    navigate('/login'); 
  };

  if (!profile) {
    return null; 
  }

  return(
    <div className="profile-info">
      <h3>User Logged in:</h3>
      <p>First name: {profile.first_name}</p>
      <p>Last name: {profile.last_name}</p>
      <p>Dob: {profile.dob}</p>
      <p>Email Address: {profile.email}</p>
      <button className="logout-button" onClick={logOut}>Log out</button>
    </div>
  )

}

function App() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const authCookie = Cookies.get('auth');
    if (authCookie) {
      setProfile(JSON.parse(authCookie));
    } else {
      setProfile(null);
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="app-container">
      <Navbar/>
      <div className="logo-container">
        <img src={Logo} alt="Ease Journal Logo" />
      </div>
      <Routes>
        <Route path="/" element={ <HomePage profile={profile}/> } />
        <Route path="login" element={<Login/>} />
        <Route path="categories" element={<Categories/>} />
        <Route path="users" element={<Users/>} />
        <Route path="journals" element={<Journals/>} />
        <Route path="register" element={<Register/>} />
      </Routes>
    </div>
  );
  
}

export default App;