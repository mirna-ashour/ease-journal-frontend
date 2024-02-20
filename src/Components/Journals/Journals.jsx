import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const JOURNALS_ENDPOINT = `${BACKEND_URL}/journals`;

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


function AddJournal({ setError, fetchJournals }) {
	const [title, setTitle] = useState('');
	const [content, setContent] =useState('');

	const changeTitle = (event) => { setTitle(event.target.value); };
	const changeContent = (event) => {setContent(event.target.value); };

	const addJournal = (event) => {
		event.preventDefault();
		axios.post(JOURNALS_ENDPOINT, { title: title, content: content, timestamp: getCurrentTimestamp(), modified: getCurrentTimestamp() }) // actual attribute name: this file's var/val
			.then(() => {
				setError('');
				fetchJournals();
			})
			.catch((e) => {
			    if (e.response && e.response.data && e.response.data.message) {
			        setError(e.response.data.message);
			    } else {
					if (e.response && e.response.data && e.response.data.message) {
						setError(e.response.data.message);
					} else {
						setError('There was a problem adding the journal entry');
					}
			    }
			});
	};

	return (
		<form>
			<label htmlFor="title">
				Journal Title
			</label>
			<input type="text" id="title" value={title} onChange={changeTitle} />

			<label htmlFor="user">
				Content
			</label>
			<input type="text" id="content" value={content} onChange={changeContent} />

			<button type="submit" onClick={addJournal}>Submit</button>
		</form>
	);
}


function Journals() {

	const [error, setError] = useState('');
	const [journals, setJournals] = useState([]);

	const fetchJournals = () => {
		axios.get(JOURNALS_ENDPOINT)
			.then((response) => {
				const journalsObject = response.data.Data;
				const keys = Object.keys(journalsObject);
				const journalsArray = keys.map((key) => journalsObject[key]);
				setJournals(journalsArray);
			}) // something good
			.catch((e) => {
				if (e.response && e.response.data && e.response.data.message) {
					setError(e.response.data.message);
				} else {
					setError('There was a problem fetching all journals.');
				}
			}); // something bad
	};
	
	useEffect(
		fetchJournals,
		[],
	)

	return (
		<div className="wrapper">
			<h1>
				Journals
			</h1>
			
			{error && (
				<div className="error-message">
					{error}
				</div>
			)}

			<AddJournal setError={setError} fetchJournals={fetchJournals} />

			{journals.map((journal) => (
				<div className="category-container">
					 <h2>Time Stamp: {journal.timestamp}</h2>
					 <p>Title: {journal.title}</p>
					 <p>Prompt: {journal.prompt}</p>
					 <p>Content: {journal.content}</p>
					 <p>Modified: {journal.modified}</p>
				</div>
			))}
		</div>
	);
}

export default Journals;
