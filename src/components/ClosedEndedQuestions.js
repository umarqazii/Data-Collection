import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function ClosedEndedQuestions() {
    const [responses, setResponses] = useState([0, 0, 0, 0, 0, 0, 0]);

    const handleChange = (index, value) => {
        const newResponses = [...responses];
        newResponses[index] = parseInt(value, 10);
        setResponses(newResponses);
    };

    const calculateScore = () => {
        let score = responses.reduce((total, response) => total + response, 0);
        return score;
    };

    //store the GAD-7 score in the database
    const handleSubmit = () => {
        let GADscore = calculateScore();
        console.log("GAD Score:", GADscore); // Debugging log to ensure gadScore is correct
    
        axios
            .post('http://localhost:4000/gadScore', {
                GADscore: GADscore, // Send gadScore with the correct key name
            })
            .then((res) => {
                console.log("Response:", res.data); // Log the response data
                // Reload the page
                window.location.reload();
                // Handle success, such as displaying a success message to the user
            })
            .catch((err) => {
                console.error("Error:", err); // Log the error for debugging
                // Handle error, such as displaying an error message to the user
            });
    };

    return (
        <div className='App'>
            <div className="container mt-4">
                <div className="card" style={{ maxWidth: '60%', margin: '0 auto' }}>
                    <div className="card-body">
                        <h3 className="card-title mb-4" style={{ color: "black" }}>Closed-Ended Questions</h3>
                        <form>
                            {questions.map((question, index) => (
                                <div key={index} className="mb-3">
                                    <p>{question}</p>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            id={`response-${index}-0`}
                                            name={`response-${index}`}
                                            value="0"
                                            checked={responses[index] === 0}
                                            onChange={() => handleChange(index, "0")}
                                            className="form-check-input"
                                        />
                                        <label htmlFor={`response-${index}-0`} className="form-check-label">
                                            0
                                        </label>
                                    </div>

                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            id={`response-${index}-1`}
                                            name={`response-${index}`}
                                            value="1"
                                            checked={responses[index] === 1}
                                            onChange={() => handleChange(index, "1")}
                                            className="form-check-input"
                                        />
                                        <label htmlFor={`response-${index}-1`} className="form-check-label">
                                            1
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            id={`response-${index}-2`}
                                            name={`response-${index}`}
                                            value="2"
                                            checked={responses[index] === 2}
                                            onChange={() => handleChange(index, "2")}
                                            className="form-check-input"
                                        />
                                        <label htmlFor={`response-${index}-2`} className="form-check-label">
                                            2
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            id={`response-${index}-3`}
                                            name={`response-${index}`}
                                            value="3"
                                            checked={responses[index] === 3}
                                            onChange={() => handleChange(index, "3")}
                                            className="form-check-input"
                                        />
                                        <label htmlFor={`response-${index}-3`} className="form-check-label">
                                            3
                                        </label>
                                    </div>
                                    <hr className="my-2" />
                                </div>

                            ))}
                        </form>

                        <div className="text-center">
                            <button style={{marginBottom: '5px'}} className="btn btn-primary" onClick={handleSubmit}>
                                Submit
                            </button><br></br>
                            <Link  to="/OpenEndedQuestions" className="btn btn-primary">
                                Proceed to Open-ended Questions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <p style={{color: "white"}}>GAD-7 Standard Questionnaire</p>
            <a href='https://adaa.org/sites/default/files/GAD-7_Anxiety-updated_0.pdf'>Source</a>
        </div>
    );
}
const questions = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid as if something awful might happen",
];
export default ClosedEndedQuestions;

//<button className="btn btn-primary" onClick={() => alert(`Your GAD-7 Score: ${calculateScore()}`)}>
//        Calculate Score
//</button>