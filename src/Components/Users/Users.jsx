import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddUserForm({ setError, fetchUsers }) {
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [dob, setDob] = useState('');
	const [email, setEmail] = useState('');

	const changeFirstName = (event) => { setFirstName(event.target.value); };
	const changeLastName  = (event) => {  setLastName(event.target.value); };
	const changeDob  = (event) => {  setDob(event.target.value); };
	const changeEmail  = (event) => {  setEmail(event.target.value); };

	const addUser = (event) => {
		event.preventDefault();
		axios.post('http://localhost:8000/users', { first_name: first_name, last_name: last_name, dob: dob, email: email }) // actual attribute name: this file's var/val
			.then(() => {
				setError('');
				fetchUsers();
			})
			.catch((e) => {
			    if (e.response && e.response.data && e.response.data.message) {
			        setError(e.response.data.message);
			    } else {
			        setError('There was a problem adding Category');
			    }
			});
	};

	return (
		<form>
			<label htmlFor="first_name">
				First Name
			</label>
			<input type="text" id="first_name" value={first_name} onChange={changeFirstName} />

			<label htmlFor="last_name">
				Last Name
			</label>
			<input type="text" id="last_name" value={last_name} onChange={changeLastName} />

			<label htmlFor="dob">
				Date of Birth
			</label>
			<input type="text" id="dob" value={dob} onChange={changeDob} />

			<label htmlFor="email">
				Email
			</label>
			<input type="text" id="email" value={email} onChange={changeEmail} />

			<button type="submit" onClick={addUser}>Add User</button>
		</form>
	);
}

function Users() {

	const [error, setError] = useState('');
	const [users, setUsers] = useState([]);

	const fetchUsers = () => {
		axios.get('http://localhost:8000/users')
		.then((response) => {
			const usersObject = response.data.Data;
			const keys = Object.keys(usersObject);
			const usersArray = keys.map((key) => usersObject[key]);
			setUsers(usersArray);
		}) // something good
		.catch(() => {
			setError('Something went wrong'); 
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
					 <h2>{user.first_name}</h2>
					 <p>Date of Birth: {user.dob}</p>
				</div>
			))}
		</div>
	);
}

export default Users;
