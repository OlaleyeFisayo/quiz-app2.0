import { createContext, useEffect, useState } from "react";
import Blobs from "./Components/blobs";
import Starter from "./Components/Starter";
import QuizContainer from "./Components/QuizContainer";

const AppContext = createContext();

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState({});
  const [scores, setScores] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    trivia_amount: "1",
    trivia_category: "9",
    trivia_difficulty: "easy",
  })
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const body = document.querySelector("body")
    if(darkMode) {
      body.className ="darkMode"
    } else {
      body.className= ""
    }
  },[darkMode])

  const contextExport = {
    questions,
    setQuestions, 
    answer, 
    setAnswer, 
    flip, 
    handleChange, 
    scores, 
    calcAnswers,
    submit,
    playAgain,
    isLoading,
    errorMessage,
    refresh,
    formHandleChange,
    formData,
    darkMode,
    toggleDarkMode
  }

  function toggleDarkMode() {
    setDarkMode(prevDarkMode => !prevDarkMode)
  }
  
  async function getQuiz() {
    try {
      const res = await fetch(`https://opentdb.com/api.php?amount=${formData.trivia_amount}&category=${formData.trivia_category}&difficulty=${formData.trivia_difficulty}&type=multiple`);
      const data = await res.json();

      setQuestions(()=> {
        const newArray = []
        data.results.map(item => {
          newArray.push({
            question: item.question,
            answer: [...item.incorrect_answers, item.correct_answer].sort(() => 0.5 - Math.random()),
            correct_answer: item.correct_answer
          })
        })
        return newArray
      })
      setIsLoading(false)
    } catch(error) {
      setErrorMessage("Unable to fetch questions, Please click the refresh button")
      setIsLoading(false)
    }
  }

  function flip() {
    setStartQuiz(true);
    setIsLoading(true)
    getQuiz()
  }

  function formHandleChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  function handleChange(event) {
    const {name, value, checked, type} = event.target
    setAnswer(prevAnwser => ({
      ...prevAnwser,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  function calcAnswers() {
    const size = Object.keys(answer).length
    for(let i = 0; i < size; i++) {
      answer[i] === questions[i].correct_answer 
        ? setScores(prevAnwser => prevAnwser+1)
        : setScores(prevAnwser => prevAnwser)
    }
    setSubmit(prevSubmit => !prevSubmit)
  }

  function playAgain() {
    setStartQuiz(false);
    setQuestions([])
    setAnswer({});
    setScores(0)
    setSubmit(false)
  }

  function refresh() {
    playAgain()
    setErrorMessage("")
  }

  return(
    <AppContext.Provider
      value={contextExport}
    >
      <div className="App">
        <Blobs />
        {startQuiz 
          ? <QuizContainer />
          : <Starter />
        }
      </div>
    </AppContext.Provider>
  )
}

export default App;
export {AppContext}