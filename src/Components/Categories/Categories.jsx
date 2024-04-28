import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BACKEND_URL } from '../../constants';

const CATEGORIES_ENDPOINT = `${BACKEND_URL}/categories`;


function AddCategoryForm({ setError, fetchCategories, profile }) {
	const [category_name, setName] = useState('');

	const changeName = (event) => { setName(event.target.value); };

	const addCategory = (event) => {
		event.preventDefault();
		axios.post(CATEGORIES_ENDPOINT, { category_name: category_name, user: profile.user_id }) 
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
			<label htmlFor="category_name">
				Category Name
			</label>
			<input type="text" id="category_name" value={category_name} onChange={changeName} />
			<button type="submit" onClick={addCategory}>Add</button>
		</form>
	);
}

function Categories({profile}) {
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
				All Categories
			</h1>
			
			{error && (
				<div className="error-message">
					{error}
				</div>
			)}

			<AddCategoryForm setError={setError} fetchCategories={fetchCategories} profile={profile}/>

			{categories.map((category) => (
				<Link key={category.category_id} to={`/journals/${category.category_id}`}>
					<div key={category.category_id} className="category-container">
						<h2>{category.category_name}</h2>
						<p>Created: {category.created}</p>
						{/* <p>Number of journals: {category.journals}</p> */}
					</div>
				</Link>
			))}
		</div>
	);
}


export default Categories;
