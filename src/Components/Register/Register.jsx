import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';


const USERS_ENDPOINT = `${BACKEND_URL}/users`;
const SIGNUP_FORM_ENDPOINT = `${BACKEND_URL}/signup/form`;

const FORM = [];

const Form = ({ fields }) => {
  const [answers, setAnswers] = useState({});
  const [formFields, setFormFields] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchForm() {
      try {
        const response = await axios.get(SIGNUP_FORM_ENDPOINT);
        setFormFields(response.data.signup_form);
        setAnswers(response.data.signup_form.reduce((acc, curr) => {
          acc[curr.fld_nm] = '';
          return acc;
        }, {}));
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
    e.preventDefault();
    try {
      await axios.post(USERS_ENDPOINT, {
        first_name: answers['first_name'],
        last_name: answers['last_name'],
        dob: answers['date_of_birth'],
        email: answers['email'],
        password: answers['password']
      });
      alert('Registered successfully!');
      navigate('/login');
    } catch (error) {
      alert('An error occurred while registering.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>REGISTER</h2><br></br>
          {formFields.map((field) => (
            <div key={field.fld_nm}>
              {field.instructions ? (
                <p>{field.question}</p>
              ) : (
                <>
                  {field.param_type === 'date' ? (
                    <input
                      id={field.fld_nm}
                      placeholder={field.question}
                      type="date"
                      value={answers[field.fld_nm]}
                      onChange={(e) => { answerQuestion(field.fld_nm, e.target.value); }}
                    />
                  ) : field.param_type === 'password' ? (
                    <input
                      id={field.fld_nm}
                      placeholder={field.question}
                      type="password"
                      value={answers[field.fld_nm]}
                      onChange={(e) => { answerQuestion(field.fld_nm, e.target.value); }}
                    />
                  ) : (
                    <input
                      id={field.fld_nm}
                      placeholder={field.question}
                      type="text"
                      value={answers[field.fld_nm]}
                      onChange={(e) => { answerQuestion(field.fld_nm, e.target.value); }}
                    />
                  )}
                </>
              )}
            </div>
          ))}
          <button className="register-button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    fld_nm: PropTypes.string,
    question: PropTypes.string,
    param_type: PropTypes.string,
    instructions: PropTypes.bool
  })).isRequired,
};

export default function FormWrapper() {
  return <Form fields={FORM} />;
}
