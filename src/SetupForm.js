import React from 'react';
import { useGlobalContext } from './context';

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();
  return (
    <main>
      <section className='quiz quiz-small'>
        <form className='setup-form'>
          <h2>setup quiz</h2>
          <div className='form-control'>
            <label htmlFor='amount'>number of questions</label>
            <input
              type='number'
              name='amount'
              id='amount'
              className='form-input'
              min={1}
              max={49}
              value={quiz.amount}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='category'>category</label>
            <select
              name='category'
              id='category'
              className='form-input'
              value={quiz.category}
              onChange={handleChange}
            >
              <option value='animals'>Animals</option>
              <option value='entertainment_music'>Entertainment: Music</option>
              <option value='geography'>Geography</option>
              <option value='general_knowledge'>General knowledge</option>
              <option value='history'>History</option>
              <option value='politics'>Politics</option>
              <option value='sports'>Sports</option>
              <option value='vehicles'>Vehicles</option>
            </select>
          </div>
          <div className='form-control'>
            <label htmlFor='difficulty'>select difficulty</label>
            <select
              name='difficulty'
              id='difficulty'
              className='form-input'
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
          </div>
          {error && (
            <p className='error'>
              Can't generate questions, please try different options!
            </p>
          )}
          <button type='submit' onClick={handleSubmit} className='submit-btn'>
            start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
