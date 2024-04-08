import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import { Link } from 'react-router-dom';

const USERS_ENDPOINT = `${BACKEND_URL}users`;

function Login() {
    const [error, setError] = useState('');
    const [profile, setProfile] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);

    const logOut = () => {
        setProfile({});
        setLoginStatus(false);
    };

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLogin = (e) => {
        e.preventDefault();
        axios.get(`${USERS_ENDPOINT}/${email}`)
        .then(response => {
            setProfile(response.data);
            if(password === response.data.password) {
                setLoginStatus(true);
            }
            else{
                setError('Incorrect password. Please try again.');
            }
        })
        .catch(e => {
            if (e.response && e.response.data && e.response.data.message) {
                setError(e.response.data.message);
            } else {
                    setError('There was a problem with logging in. Please try again.');
                }
        });
    };

    return (
        <div className="login-page">
            <div className="login-container">
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                {loginStatus ? (
                    <div className="profile-info">
                        <h3>User Logged in:</h3>
                        <p>Name: {profile.first_name}</p>
                        <p>Email Address: {profile.email}</p>
                        <button className="logout-button" onClick={logOut}>Log out</button>
                    </div>
                ) : (
                    <form className="login-form" onSubmit={handleLogin}>
                        <h2>USER LOGIN</h2>
                        <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                        <button type="submit" className="login-button">Login</button>
                        {/* <button type="button" className="google-signin-button" onClick={login}>Sign in with Google</button> */}
                        <p className="register-link">
                            <Link to="/register">Create an account</Link>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Login;
