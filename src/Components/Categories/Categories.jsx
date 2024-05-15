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
			<input className="main-form-input" type="text" id="category_name" value={category_name} onChange={changeName} />
			<button type="submit" onClick={addCategory}>Add Category</button>
		</form>
	);
}

function Categories({profile}) {
	const [error, setError] = useState('');
	const [categories, setCategories] = useState([]);
	const [editingCategory, setEditingCategory] = useState(null);
	const [updatedCategoryName, setUpdatedCategoryName] = useState('');
	const userId = profile?.user_id;


	const fetchCategories = () => {
		//axios.get(CATEGORIES_ENDPOINT)
		axios.get(`${CATEGORIES_ENDPOINT}/${userId}`)
			.then((response) => {
				const categoriesObject = response.data.Data;
				const keys = Object.keys(categoriesObject);
				const categoriesArray = keys.map((key) => categoriesObject[key]);
				setCategories(categoriesArray);
			}) // something good
			.catch((e) => { 
				if (e.response && e.response.data && e.response.data.message) {
			        setError(e.response.data.message);
			    } // else {
			    //     setError('There was a problem fetching all categories.');
			    // }
			}); // something bad
	};

	useEffect(
		fetchCategories,
		[userId],
	);

	const deleteCategory = (categoryId) => {
		axios.delete(`${CATEGORIES_ENDPOINT}/delete/${categoryId}`)
		  .then(() => {
			  setCategories(prevCategories => prevCategories.filter(category => category.category_id !== categoryId)); 
		  })
		  .catch((e) => {
			if (e.response && e.response.data && e.response.data.message) {
				setError(e.response.data.message);
			} else {
				setError('There was a problem deleting this category.');
			}
		  });
	};

	const updateCategoryName = () => {
    axios.put(`${CATEGORIES_ENDPOINT}/${editingCategory}`, { category_name: updatedCategoryName })
      .then(() => {
        fetchCategories();
        setEditingCategory(null);
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.message) {
      	  setError(e.response.data.message);
        } else {
          setError('There was a problem updating this category.');
        }
      });
  };

  const handleEdit = (categoryId, categoryName) => {
    setEditingCategory(categoryId);
    setUpdatedCategoryName(categoryName);
  };
	  
	return (
		<div className="wrapper">
		  <h1>
			All Categories
		  </h1>
		  <br></br>
	
		  {error && (
			<div className="error-message">
			  {error}
			</div>
		  )}
	
		  <AddCategoryForm setError={setError} fetchCategories={fetchCategories} profile={profile} />
		  <br></br>
	
		  {categories.map((category) => (
			<div key={category.category_id} className="category-container">
			  {editingCategory === category.category_id ? (
			  	<div>
			  	  <input type="text" value={updatedCategoryName} placeholder="Category Name" onChange={(e) => setUpdatedCategoryName(e.target.value)}/>
			  	  <button onClick={updateCategoryName} className="save-button">Save</button>
			  	  <button onClick={() => setEditingCategory(null)} className="cancel-button">Cancel</button>
			  	</div>
			  ) : (
			  	<>
				  <Link to={`/journals/${category.category_id}`} className="category-link">
					<div>
					  <h2>{category.category_name}</h2>
					  <p>Created: {category.created}</p>
					  {/* <p>Number of journals: {category.journals}</p> */}
					</div>
					<br></br>
				  </Link>
				  <button onClick={() => deleteCategory(category.category_id)} className="delete-button">Delete</button>
			    <button onClick={() => handleEdit(category.category_id, category.category_name)} className="edit-button">Edit</button>
				</>
			  )}
			</div>
		  ))}
		</div>
	);
}

export default Categories;
