import { useContext, useEffect, useRef } from "react"
import { AppContext } from "../App";

export default function Question({question, id, answers}) {
    const { answer, setAnswer, handleChange, submit, questions } = useContext(AppContext)
    const questionRef = useRef(null);
    const option = {
        optionOne: useRef(null),
        optionTwo: useRef(null),
        optionThree: useRef(null),
        optionFour: useRef(null),
    }

    useEffect(()=> {
        questionRef.current.innerHTML = question
        option.optionOne.current.innerHTML = answers[0]
        option.optionTwo.current.innerHTML = answers[1]
        option.optionThree.current.innerHTML = answers[2]
        option.optionFour.current.innerHTML = answers[3]
        const modifyAnswer = () => {
            setAnswer((prevAnswer) => ({
                ...prevAnswer,
                [id]: ""
            }))
        }
        modifyAnswer()
    }, [])

    useEffect(()=> {
        if(submit) {
            const one = option.optionOne.current
            const two = option.optionTwo.current
            const three = option.optionThree.current
            const four = option.optionFour.current
            for(let i = 0;i < questions.length; i++) {
                const question = questions[i]
                if(one.innerHTML === question.correct_answer) {
                    one.classList.add("correct")
                }else if(one.innerHTML === answer[i] && answer[i] !== question.correct_answer) {
                    one.classList.add("wrong")
                }
                if(two.innerHTML === question.correct_answer) {
                    two.classList.add("correct")
                }else if(two.innerHTML === answer[i] && answer[i] !== question.correct_answer) {
                    two.classList.add("wrong")
                }
                if(three.innerHTML === question.correct_answer) {
                    three.classList.add("correct")
                }else if(three.innerHTML === answer[i] && answer[i] !== question.correct_answer) {
                    three.classList.add("wrong")
                }
                if(four.innerHTML === question.correct_answer) {
                    four.classList.add("correct")
                }else if(four.innerHTML === answer[i] && answer[i] !== question.correct_answer) {
                    four.classList.add("wrong")
                }
            }
        }
    }, [submit])

    return(
        <div className="questions">
            <h1 className="question" ref={questionRef} id={id}></h1>
            <div className="radio-boxes">
                <input 
                    type="radio"
                    name={id}
                    id={answers[0]}
                    value={answers[0]}
                    checked={answer[id]===answers[0]} 
                    onChange={handleChange}
                />
                <label
                    className="labels"
                    htmlFor={answers[0]}
                    ref={option.optionOne}
                ></label>
                <input 
                    type="radio"
                    name={id}
                    id={answers[1]}
                    value={answers[1]}
                    checked={answer[id]===answers[1]} 
                    onChange={handleChange}
                />
                <label
                    className="labels"
                    htmlFor={answers[1]}
                    ref={option.optionTwo}
                ></label>
                <input 
                    type="radio"
                    name={id}
                    id={answers[2]}
                    value={answers[2]}
                    checked={answer[id]===answers[2]} 
                    onChange={handleChange}
                />
                <label
                    className="labels"
                    htmlFor={answers[2]}
                    ref={option.optionThree}
                ></label>
                <input 
                    type="radio"
                    name={id}
                    id={answers[3]}
                    value={answers[3]}
                    checked={answer[id]===answers[3]} 
                    onChange={handleChange}
                />
                <label
                    className="labels"
                    htmlFor={answers[3]}
                    ref={option.optionFour}
                ></label>
            </div>
        </div>
    )
}