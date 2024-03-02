import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const CATEGORIES_ENDPOINT = `${BACKEND_URL}/categories`;


function AddCategoryForm({ setError, fetchCategories }) {
	const [title, setTitle] = useState('');
	const [user, setUser] = useState('');

	const changeTitle = (event) => { setTitle(event.target.value); };
	const changeUser  = (event) => {  setUser(event.target.value); };

	const addCategory = (event) => {
		event.preventDefault();
		axios.post(CATEGORIES_ENDPOINT, { title: title, user: user }) // actual attribute name: this file's var/val
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
		axios.get(CATEGORIES_ENDPOINT)
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
