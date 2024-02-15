import React, { useState, useEffect } from 'react';
import axios from 'axios';

function getCurrentTimestamp() {
    const currentDate = new Date();

    // Get date components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    // Assemble formatted date string
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}

function AddCategoryForm({ setError, fetchCategories }) {
	const [title, setTitle] = useState('');
	const [user, setUser] = useState('');

	const changeTitle = (event) => { setTitle(event.target.value); };
	const changeUser  = (event) => {  setUser(event.target.value); };

	const addCategory = (event) => {
		event.preventDefault();
		axios.post('http://localhost:8000/categories', { title: title, user: user, created: getCurrentTimestamp() }) // actual attribute name: this file's var/val
			.then(() => {
				setError('');
				fetchCategories();
			})
			.catch((e) => {
			    if (e.response && e.response.data && e.response.data.message) {
			        setError(e.response.data.message);
			    } else {
					if (e.response && e.response.data && e.response.data.message) {
						setError(e.response.data.message);
					} else {
						setError('There was a problem adding the category');
					}
			    }
			});
	};

	return (
		<form>
			<label htmlFor="title">
				Category Title
			</label>
			<input type="text" id="title" value={title} onChange={changeTitle} />

			<label htmlFor="user">
				User ID
			</label>
			<input type="text" id="user" value={user} onChange={changeUser} />

			<button type="submit" onClick={addCategory}>Submit</button>
		</form>
	);
}

function Categories() {
	const [error, setError] = useState('');
	const [categories, setCategories] = useState([]);

	const fetchCategories = () => {
		axios.get('http://localhost:8000/categories')
			.then((response) => {
				const categoriesObject = response.data.Data;
				const keys = Object.keys(categoriesObject);
				const categoriesArray = keys.map((key) => categoriesObject[key]);
				setCategories(categoriesArray);
			}) // something good
			.catch((e) => { 
				if (e.response && e.response.data && e.response.data.message) {
			        setError(e.response.data.message);
			    } else {
			        setError('There was a problem fetching all categories.');
			    }
			}); // something bad
	};

	useEffect(
		fetchCategories,
		[],
	);
	  
	return (
		<div className="wrapper">
			<h1>
				Categories
			</h1>
			
			{error && (
				<div className="error-message">
					{error}
				</div>
			)}

			<AddCategoryForm setError={setError} fetchCategories={fetchCategories} />

			{categories.map((category) => (
				<div key={category.category_id} className="category-container">
					 <h2>Category_id: {category.category_id}</h2>
					 <p>Title: {category.title}</p>
					 <p>User_id: {category.user}</p>
					 <p>Created: {category.created}</p>
				</div>
			))}
		</div>
	);
}


export default Categories;
