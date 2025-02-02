import React, { useEffect, useState } from 'react'
import Option from './Option';

const Question = ({description,options,explaination,handleNextQuestion,score,setScore}) => {

    const [isOptionChosen,setIsOptionChosen]=useState(false);
    const [isChosenOptionCorrect,setIsChosenOptionCorrect]=useState(false);
    const [chosenOption,setChosenOption]=useState(null);
    const [correctOption]=useState(()=>{
      let result;
      options.forEach((option,index)=>{
        if(option.is_correct){
          result=index;
        }
      });
      return result;
    })

    useEffect(()=>{
      console.log(options);
    })

    const checkAnswer=(isCorrect,chosenOption)=>{
      setIsOptionChosen(true);
      setChosenOption(chosenOption);
      setIsChosenOptionCorrect(isCorrect);
      updateScore();
    }

    const updateScore=()=>{
      if(isChosenOptionCorrect){
        setScore({...score,correctAnswers:score.correctAnswers+1});
      }
      else{
        setScore({...score,wrongAnswers:score.wrongAnswers+1});
      }
      console.log(score);
    }

    const renderAnswer=()=>{
      if(isOptionChosen){
        if(isChosenOptionCorrect){
          return (
          <div className='flex flex-col items-start gap-y-5'>
          <p className='text-green-800 font-bold'>Option  {chosenOption} : Correct Answer</p>
          <h4 className='text-cyan-900 font-medium'>Explaination:</h4>
          <p className='text-sm leading-relaxed text-green-800 font-bold'>{explaination}</p>
          </div>
        )
        }
        else{
          return (
          <div className='flex flex-col items-start gap-y-5'>
          <p className='text-red-800 font-bold'>Option  {chosenOption} : Wrong Answer</p>
          <h4 className='text-cyan-900 font-medium'>Explaination:</h4>
          <p className='text-sm leading-relaxed text-green-800 font-bold'>{explaination}</p>
          </div> 
          )
        }
      }
      else{
        return;
      }
    }

  return (
    <div className='flex items-center border-2 justify-center p-14 flex-col gap-y-8'>
        <p className='text-xl text-cyan-900 font-bold'>{description}</p>
        <div className='grid grid-cols-2 gap-x-10 gap-y-10 w-full'>
        {
          options.map((option,index)=>(
          <Option description={option.description} isCorrect={option.is_correct} checkAnswer={checkAnswer} optionNumber={index} isOptionChosen={isOptionChosen} chosenOption={chosenOption} correctOption={correctOption}></Option>
          ))
        }
        </div>

        <div className='flex justify-items-start w-full'>
          {renderAnswer()}
        </div>

        <div className='flex w-full justify-end'>
          {isOptionChosen ? <button onClick={()=>{
            setIsOptionChosen(false);
            handleNextQuestion();
          }} className='text-lg rounded-lg p-4 border hover:cursor-pointer hover:text-cyan-900 duration-700'>Next</button> : ''}
        </div>
    </div>

  )
}

export default Question
