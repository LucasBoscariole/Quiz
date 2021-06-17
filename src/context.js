import axios from 'axios';
import React, { useState, useContext } from 'react';

const table = {
  animals: 27,
  general_knowledge: 9,
  politics: 24,
  geography: 22,
  history: 23,
  sports: 21,
  vehicles: 28,
  entertainment_music: 12,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'animals',
    difficulty: 'easy',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        //check if got a array from the API
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  }; // Increase the index, going to the next question

  const checkAnswer = (value) => {
    if (value) {
      setCorrectAnswers((oldState) => oldState + 1);
    }
    nextQuestion();
  }; // Check if the answer is correct. The value is on App.js line 47

  const openModal = () => {
    setIsModalOpen(true);
  }; // open the modal

  const closeModal = () => {
    setWaiting(true);
    setCorrectAnswers(0);
    setIsModalOpen(false);
  }; // Close the modal and make it come to the starter page

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  }; // change the input selected

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(url);
  }; // Call the url based on the inputs and call the fetchQuestions.

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correctAnswers,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
