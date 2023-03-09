import Question from "./Question";
import { useContext } from "react";
import { AppContext } from "../App";
import Spinner from "./Spinner";


export default function QuizContainer() {

    const {questions, calcAnswers, scores, submit, playAgain, isLoading, errorMessage, refresh} = useContext(AppContext) 
    
    const questionElement = questions.map((question, index) => {
        return (
            <Question
                key={question.correct_answer}
                question={question.question}
                answers={question.answer}
                id={index}
            />
        )
    })

    function renderButtons() {
        if(errorMessage) {
            return (
                <button
                    className="refresh"
                    onClick={refresh}
                >Refresh</button>
            )
        } else if(!submit) {
            return (
                <button
                    disabled={isLoading}
                    onClick={calcAnswers}
                    className="checkAnswer-btn"
                >
                    Check Answers
                </button>
            )
        } else {
            return (
                <div className="answer-revieled">
                    <p>You scored {scores}/{questions.length} correct answers</p>
                    <button
                        onClick={playAgain}
                    >play Again</button>
                </div>
            )
        }
    }

    return (
        <div className="quizContainer">
            {isLoading 
                ? <Spinner />
                : questionElement
            }
            {errorMessage && <p className="Error">{errorMessage}</p>}
            <div className="submit">
                {renderButtons()}
            </div>
        </div>
    )
}