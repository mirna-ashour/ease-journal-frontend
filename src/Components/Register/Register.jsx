import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `${BACKEND_URL}/users`;

function Register() {
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDOB] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(USERS_ENDPOINT, { first_name:firstName, last_name:lastName, 
            dob:dob, email:email, password:password }) // actual attribute name: this file's var/val
        .then(() => {
            setError('');
        })
        .catch((e) => {
            if (e.response && e.response.data && e.response.data.message) {
                setError(e.response.data.message);
            } else {
                    setError('There was a problem registering. Please try again.');
                }
        });
        console.log('Form submitted:', { firstName, lastName, dob, email, password });
        // Clear form fields after submission
        setFirstName('');
        setLastName('');
        setDOB('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="login-container">
            {error && (
				<div className="error-message">
					{error}
				</div>
			)}
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                            type="date"
                            id="dob"
                            value={dob}
                            onChange={(e) => setDOB(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
