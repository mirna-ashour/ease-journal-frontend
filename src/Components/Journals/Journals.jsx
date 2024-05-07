import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { BACKEND_URL } from '../../constants';

const JOURNALS_ENDPOINT = `${BACKEND_URL}/journals`;


function AddJournal({ setError, fetchJournals, profile }) {
	const [title, setTitle] = useState('');
	const [content, setContent] =useState('');
	const prompt = "no" 		
	const { categoryId } = useParams();

	const changeTitle = (event) => { setTitle(event.target.value); };
	const changeContent = (event) => { setContent(event.target.value); };

	const addJournal = (event) => {
		event.preventDefault();
		axios.post(JOURNALS_ENDPOINT, { title: title, prompt: prompt, content: content, user: profile.user_id, category: categoryId }) // actual attribute name: this file's var/val
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
				Entry Title
			</label>
			<input className="main-form-input" type="text" id="title" value={title} onChange={changeTitle} />

			<label htmlFor="user">
				Content
			</label>
			<textarea className="form-textarea" type="text" id="content" value={content} onChange={changeContent} />
			<button type="submit" onClick={addJournal}>Add</button>
		</form>
	);
}


function Journals({profile}) {
	const [error, setError] = useState('');
	const [journals, setJournals] = useState([]);
	const [editingJournal, setEditingJournal] = useState(null);
	const [updatedJournalTitle, setUpdatedJournalTitle] = useState('');
	const [updatedJournalContent, setUpdatedJournalContent] = useState('');
	const { categoryId } = useParams();

	const fetchJournals = () => {
	  axios.get(`${JOURNALS_ENDPOINT}/${categoryId}`)
		.then((response) => {
		  const journalsObject = response.data.Data;
		  const keys = Object.keys(journalsObject);
		  const journalsArray = keys.map((key) => journalsObject[key]);
		  setJournals(journalsArray);
		})
		.catch((e) => {
		  if (e.response && e.response.data && e.response.data.message) {
			setError(e.response.data.message);
		  } else {
			setError('There was a problem fetching all journals.');
		  }
		});
	};
  
	useEffect(
	  fetchJournals,
	  [categoryId],
	);
  
	const deleteJournal = (journalId) => {
	  axios.delete(`${JOURNALS_ENDPOINT}/delete/${journalId}`)
		.then(() => {
		  setJournals(prevJournals => prevJournals.filter(journal => journal.journal_id !== journalId)); // Fetch journals again to update the UI
		})
		.catch((e) => {
		  setError('There was a problem deleting the journal entry.');
		});
	};
  
	const updateJournal = () => {
		axios.put(`${JOURNALS_ENDPOINT}/${editingJournal}`, { title: updatedJournalTitle, content: updatedJournalContent})
		  .then(() => {
			fetchJournals();
			setEditingJournal(null);
		  })
		  .catch((e) => {
			if (e.response && e.response.data && e.response.data.message) {
				setError(e.response.data.message);
			} else {
			  setError('There was a problem updating this journal.');
			}
		  });
	};

	const handleEdit = (journalID, journalTitle, journalContent) => {
		setEditingJournal(journalID);
		setUpdatedJournalTitle(journalTitle);
		setUpdatedJournalContent(journalContent);
	};

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
  
		<AddJournal setError={setError} fetchJournals={fetchJournals} profile={profile}/>
  
		{journals.map((journal) => (
		  <div key={journal.journal_id} className="journal-container">
			{editingJournal === journal.journal_id ? (
			  <>
				<input type="text" value={updatedJournalTitle} placeholder="Journal Title" onChange={(e) => setUpdatedJournalTitle(e.target.value)}/>
				<textarea className="form-textarea" value={updatedJournalContent} placeholder="Journal Content" onChange={(e) => setUpdatedJournalContent(e.target.value)}/>
				<button onClick={updateJournal} className="save-button">Save</button>
				<button onClick={() => setEditingJournal(null)} className="cancel-button">Cancel</button>
			  </>
			) : (
			  <>
				<h2>Title: {journal.title}</h2>
				<p>Created: {journal.timestamp}</p>
				<p>Content: {journal.content}</p>
				<p>Last Modified: {journal.modified}</p>
				<br></br><br></br>
				<button onClick={() => deleteJournal(journal.journal_id)} className="delete-button">Delete</button>
				<button onClick={() => handleEdit(journal.journal_id, journal.title, journal.content)} className="edit-button">Edit</button>
			  </>
			)}
		  </div>
		))}
	  </div>
	);
}

export default Journals;
