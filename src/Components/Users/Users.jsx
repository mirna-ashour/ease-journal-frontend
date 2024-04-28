import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `${BACKEND_URL}/users`;

function AddUserForm({ setError, fetchUsers }) {
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [dob, setDob] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');


	const changeFirstName = (event) => { setFirstName(event.target.value); };
	const changeLastName  = (event) => {  setLastName(event.target.value); };
	const changeDob  = (event) => {  setDob(event.target.value); };
	const changeEmail  = (event) => {  setEmail(event.target.value); };
	const changePassword  = (event) => {  setPassword(event.target.value); };


	const addUser = (event) => {
		event.preventDefault();
		axios.post(USERS_ENDPOINT, { first_name: first_name, last_name: last_name, dob: dob, email: email, password: password }) // actual attribute name: this file's var/val
			.then(() => {
				setError('');
				fetchUsers();
			})
			.catch((e) => {
			    if (e.response && e.response.data && e.response.data.message) {
			        setError(e.response.data.message);
			    } else {
			        setError('There was a problem adding a user');
			    }
			});
	};

	return (
		<form>
			<label htmlFor="first_name">
				First Name
			</label>
			<input className="main-form-input" type="text" id="first_name" value={first_name} onChange={changeFirstName} />

			<label htmlFor="last_name">
				Last Name
			</label>
			<input className="main-form-input" type="text" id="last_name" value={last_name} onChange={changeLastName} />

			<label htmlFor="dob">
				Date of Birth
			</label>
			<input className="main-form-input" type="date" id="dob" value={dob} onChange={changeDob} />

			<label htmlFor="email">
				Email
			</label>
			<input className="main-form-input" type="text" id="email" value={email} onChange={changeEmail} />

			<label htmlFor="password">
				Password
			</label>
			<input className="main-form-input" type="text" id="password" value={password} onChange={changePassword} />

			<button type="submit" onClick={addUser}>Add User</button>
		</form>
	);
}

function Users() {

	const [error, setError] = useState('');
	const [users, setUsers] = useState([]);

	const fetchUsers = () => {
		axios.get(USERS_ENDPOINT)
		.then((response) => {
			const usersObject = response.data.Data;
			const keys = Object.keys(usersObject);
			const usersArray = keys.map((key) => usersObject[key]);
			setUsers(usersArray);
		}) // something good
		.catch((e) => {
			if (e.response && e.response.data && e.response.data.message) {
				setError(e.response.data.message);
			} else {
				setError('There was a problem fetching all users.');
			}
		}); // something bad
	};

	useEffect(
		fetchUsers,
		[],
	);

	return (
		<div className="wrapper">
			<h1>
				Users
			</h1>
			
			{error && (
				<div className="error-message">
					{error}
				</div>
			)}

			<AddUserForm setError={setError} fetchUsers={fetchUsers} />

			{users.map((user) => (
				<div key={user.user_id} className="user-container">
					 {/* <h2>User_id: {user.user_id}</h2> */}
					 <h2>Email: {user.email}</h2>
					 <p>Name: {user.first_name + ' ' + user.last_name}</p>
					 {/* <p>Last Name: {user.last_name}</p> */}
					 <p>DOB: {user.dob}</p>
					 <p>Password: {user.password}</p>
				</div>
			))}
		</div>
	);
}

export default Users;
