import React, { useEffect, useState } from 'react'
import Question from '../components/Question';


const Home = () => {
    const [questions,setQuestions]=useState([]);
    const [shouldRenderQuestions,setShouldRenderQuestions]=useState(false);
    const [questionNumber,setQuestionNumber]=useState(0);
    const [score,setScore]=useState({correctAnswers:0,wrongAnswers:0});

    useEffect(()=>{
        fetchQuestions();
        console.log(questions);
    },[]);

    useEffect(()=>{
        if(shouldRenderQuestions)
        renderQuestion();
    },[questionNumber])

    const handleNextQuestion=()=>{
        setQuestionNumber(questionNumber+1);
        console.log("Score is",score);
    }

    const displayScore=()=>{
        let finalScore=score.correctAnswers;
        let totalScore=questions.length;
        let percentage=finalScore/totalScore*100;
        if(percentage>90){
            return(
            <>
            <p>That's awesome</p>
            <p>Your Score is {finalScore} out of {totalScore} and You got {percentage}%.</p>
            </>)
        }
        else if(percentage>=80 && percentage<=90){
            return(
            <>
            <p>Well Played!</p>
            <p>Your Score is {finalScore} out of {totalScore} and You got {percentage}%.</p>
            </>)
        }
        else if(percentage>=60 && percentage<=80){
            return(
            <>
            <p className='text-cyan-700 font-bold text-3xl'>Good!</p>
            <p className='text-2xl font-bold text-cyan-800'>Your Score is {finalScore} out of {totalScore} and You got {percentage}%.</p>
            </>)
        }
        else if(percentage>=30 && percentage<=60){
            return(
            <>
            <p className='text-cyan-700 font-bold text-3xl'>Nice!</p>
            <p className='text-2xl font-bold text-cyan-800'>Your Score is {finalScore} out of {totalScore} and You got {percentage}%.</p>
            </>)
        }
        else if(percentage<30){
            return(
            <>
            <p className='text-cyan-700 font-bold text-3xl'>Keep Trying!</p>
            <p className='text-2xl font-bold text-cyan-800'>Your Score is {finalScore} out of {totalScore} and You got {percentage}%.</p>
            </>)
        }
    }
 

    const renderQuestion=()=>{
        console.log('Current Question Number is :',questionNumber);
        if(questionNumber>=questions.length){
            return (
                <div className='flex flex-col gap-y-5 pt-10 items-center'>
                {displayScore()}
                <button onClick={()=>{
                    fetchQuestions();
                    setQuestionNumber(0);
                }} className='border-2 text-cyan-800 cursor-pointer hover:bg-cyan-800 hover:text-white duration-500 border-cyan-800 p-4 w-fit rounded-full '>Play Again</button>
                </div>
            )
        }
        else
        {
            return <Question description={questions[questionNumber].description} options={questions[questionNumber].options} explaination={questions[questionNumber].detailed_solution} handleNextQuestion={handleNextQuestion} score={score} setScore={setScore}></Question>
        } 
    }

    const fetchQuestions=async ()=>{
        let responseObj=await fetch("http://localhost:3000/fetchQuestions",{
            method:"GET",
            mode:"cors"
        });
        let response=await responseObj.json();
        setQuestions(response.questions);
    }

  return (

    !shouldRenderQuestions ? 
    <div className='w-full h-full flex justify-center pt-20'>
        <div className='flex flex-col items-center gap-y-5'>
            <p className='text-5xl text-cyan-600 max-md:text-3xl max-sm:xl'>Align your goals with <span className='font-bold'>Testline</span> </p>
            <button onClick={()=>{
                setShouldRenderQuestions(true);
            }} className='border p-3 rounded-full text-cyan-600 cursor-pointer hover:bg-cyan-600 hover:text-white duration-700'>Start Quiz</button>
        </div>
    </div> : renderQuestion()
  )
}

export default Home
