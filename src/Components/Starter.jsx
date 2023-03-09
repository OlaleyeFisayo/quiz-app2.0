import { useContext } from "react"
import { AppContext } from "../App"
import DarkMode from "./DarkMode"

export default function Starter() {

    const {flip, formHandleChange, formData} = useContext(AppContext)

    return (
        <header className="Starter">
            <DarkMode />
            <h1 className="title">Quizzical</h1>
            <p className="description">This A Quiz app, but this time i'm using React and accessing the questions from an API</p>
            <div className="form">
                <label htmlFor="trivia_amount">Number of Questions:</label>
                <input 
                    type="number"
                    id="trivia_amount"
                    name="trivia_amount"
                    min={1}
                    max={50}
                    onChange={formHandleChange}
                    value={formData.trivia_amount}
                />
                <label htmlFor="trivia_category">Select Category: </label>
                <select
                    id="rivia_category" 
                    name="trivia_category"
                    value={formData.trivia_category}
                    onChange={formHandleChange}
                    className="form-control"
                >
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals & Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science & Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="31">Entertainment: Japanese Anime & Manga</option>
                    <option value="32">Entertainment: Cartoon & Animations</option>
                </select>
                <label htmlFor="trivia_difficulty">Select Difficulty: </label>
                <select 
                   id="trivia_difficulty"
                   name="trivia_difficulty"
                   value={formData.trivia_difficulty}
                   onChange={formHandleChange}
                   className="form-control"
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <button 
                onClick={flip}
                className="startQuiz-btn"
            >Start Quiz</button>
        </header>
    )
}