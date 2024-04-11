import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `${BACKEND_URL}/users`;
const SIGNUP_FORM_ENDPOINT = `${BACKEND_URL}/signup/form`;

const FORM = [
  {
    FLD_NM: 'first_name',
    type: 'text',
  },

  {
    FLD_NM: 'last_name',
    type: 'text',
  },

  {
    FLD_NM: 'dob', 
    type: 'date',
  },

  {
    FLD_NM: 'email',
    type: 'text',
  },

  {
    FLD_NM: 'password',
    type: 'password',
  },
];

/* This function just takes an array 'fields' (of the format described above) and
 * creates an object where the keys are the fieldName values for each item in 'fields'
 * and the values are the values given by the user. If you don't set an initial value
 * (here it's an empty string ''), when the user enters a value you'll switch from
 * an uncontrolled input (user can do whatever) to a controlled input (value is fixed).
 * Usually, if you're writing a frontend in React, you want all inputs to be
 * controlled.
 */
function fieldsToAnswers(fields) {
    const answers = {};
    fields.forEach(({ FLD_NM }) => { answers[FLD_NM] = ''; });
    return answers;
  }
  
function Form({ fields }) {
  const [answers, setAnswers] = useState(fieldsToAnswers(fields));

  useEffect(() => {
    async function fetchForm() {
      try {
        const response = await axios.get(SIGNUP_FORM_ENDPOINT);
        const formFields = response.data;
        setAnswers(fieldsToAnswers(formFields));
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    }
    fetchForm();
  }, []);

  const answerQuestion = (fieldName, value) => {
    setAnswers({ ...answers, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
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
            onChange={(e) => { answerQuestion(FLD_NM, e.target.value); }}
          />
        </div>
      ))}
      <button type="submit">Sign Up</button>
    </form>
  );
}

Form.propTypes = {
  fields: propTypes.arrayOf(propTypes.shape({
    FLD_NM: propTypes.string,
    type: propTypes.string,
  })).isRequired,
};

export default function FormWrapper() {
  return <Form fields={FORM} />;
}