import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Ensure to import the updated CSS file for Login component styles

function Login() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your login logic here using email and password states
    };

    return (
        <div className="login-page">
            <div className="login-container">
                {profile ? (
                    <div className="profile-info">
                        <h3>User Logged in:</h3>
                        <p>Name: {profile.name}</p>
                        <p>Email Address: {profile.email}</p>
                        <button className="logout-button" onClick={logOut}>Log out</button>
                    </div>
                ) : (
                    <form className="login-form" onSubmit={handleLogin}>
                        <h2>USER LOGIN</h2>
                        <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                        <button type="submit" className="login-button">Login</button>
                        <button type="button" className="google-signin-button" onClick={login}>Sign in with Google</button>
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
