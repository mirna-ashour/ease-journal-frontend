import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const USERS_ENDPOINT = `${BACKEND_URL}users`;

function Login() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLogin = (e) => {
        e.preventDefault();
        axios.get(`${USERS_ENDPOINT}/${email}`)
        .then(response => {
            if(password === response.data.password) {
                const expirationTime = new Date(new Date().getTime() + 30 * 60 * 1000);
                delete response.data.password
                Cookies.set('auth', JSON.stringify(response.data), { expires: expirationTime });
                navigate('/');
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
                <form className="login-form" onSubmit={handleLogin}>
                    <h2>LOGIN</h2><br></br>
                    <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                    <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    <button type="submit" className="login-button">Login</button>
                    <p className="register-link">
                        <Link to="/register">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
