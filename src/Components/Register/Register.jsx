import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `${BACKEND_URL}/users`;
const SIGNUP_FORM_ENDPOINT = `${BACKEND_URL}/signup/form`;

function fieldsToAnswers(fields) {
  const answers = {};
  fields.forEach(({ FLD_NM }) => {
    answers[FLD_NM] = '';
  });
  return answers;
}

function Form({ fields }) {
  const [answers, setAnswers] = useState(fieldsToAnswers(fields));

  const answerQuestion = (fieldName, value) => {
    setAnswers({ ...answers, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(USERS_ENDPOINT, answers);
      alert('Registered successfully!');
    } catch (error) {
      alert('An error occurred while registering.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(({ FLD_NM, type }) => (
        <div key={FLD_NM}>
          <label htmlFor={FLD_NM}>{FLD_NM}</label>
          <input
            id={FLD_NM}
            type={type}
            value={answers[FLD_NM]}
            onChange={(e) => {
              answerQuestion(FLD_NM, e.target.value);
            }}
          />
        </div>
      ))}
      <button type="submit">Sign Up</button>
    </form>
  );
}

Form.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      FLD_NM: PropTypes.string,
      type: PropTypes.string,
    })
  ).isRequired,
};

export default function FormWrapper() {
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    async function fetchForm() {
      try {
        const response = await axios.get(SIGNUP_FORM_ENDPOINT);
        const formFieldsData = response.data;
        setFormFields(formFieldsData);
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    }

    fetchForm();
  }, []);

  return <Form fields={formFields} />;
}