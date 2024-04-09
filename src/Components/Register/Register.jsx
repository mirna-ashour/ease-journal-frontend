import React, { useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `${BACKEND_URL}/users`;

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
    FLD_NM: 'date_of_birth', 
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
 * creates an object where the keys are the FLD_NM values for each item in 'fields'
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
  
  function Form({ fields, handleSubmit }) {
    /* This line creates two things: an object (answers) which stores the user's input
     * and a function (setAnswers) which can update that object. If you simply had the
     * code
     *   function Form() {
     *    ...
     *    const answers = fieldsToAnswers(fields);
     *    ...
     *   }
     * you would run into trouble because it would be reset every render and so user
     * input would not work.
     * 
     * If you had the code
     *   const answers = fieldsToAnswers(fields);
     *   function Form() {
     *    ...
     *   }
     * you would run into trouble because user input would not cause the form to re-
     * render, meaning that a) they would not see that the input was working and
     * b) only one letter of their input would be stored.
     */
    const [answers, setAnswers] = useState(fieldsToAnswers(fields));
    /* This function stores the user's input in the array with a key corresponding to
     * the field which they were editing, and - crucially - calls setAnswers with a
     * shallow copy of answers. If you did not call setAnswers or called
     *   setAnswers(answers);
     * the component would not re-render and the user would not see that their input
     * was working. Also it wouldn't quite work anyway - as mentioned above it would
     * only store one character.
     */
    const answerQuestion = (FLD_NM, value) => {
      answers[FLD_NM] = value;
      setAnswers({ ...answers });
    };
  
    return (
      <form>
        {/* Maps objects in the fields array to <input> elements. */}
        {fields.map(({ FLD_NM, type }) => (
          <input
            key={FLD_NM}
            type={type}
            onChange={(e) => { answerQuestion(FLD_NM, e.target.value); }}
          />
        ))}
        {/* Adds a button which calls the handleSubmit function when the user
          * clicks it or presses enter. If the button type is "button" instead
          * of "submit", they'd have to manually click the button - enter wouldn't
          * word. Not the end of the world, but a little more annoying.
          */}
        <button type="submit" onClick={() => { handleSubmit(answers); }} />
      </form>
    );
  }
  
  Form.propTypes = {
    fields: propTypes.arrayOf(propTypes.shape({
      FLD_NM: propTypes.string,
      type: propTypes.string,
    })).isRequired,
    handleSubmit: propTypes.func.isRequired,
  };
  
  export default function FormWrapper() {
    return <Form fields={FORM} />;
  }