import React, { useEffect, useState } from 'react'
import { useRef } from 'react';

const Option = ({description,isCorrect,checkAnswer,optionNumber,isOptionChosen,chosenOption,correctOption}) => {

    const optionIdentifiers=['A','B','C','D'];

    useEffect(()=>{
        console.log(optionNumber);
        console.log(optionIdentifiers[optionNumber]);
    })

  return (
    <button onClick={()=>{
        if(isOptionChosen){
          return;
        }
        checkAnswer(isCorrect,optionIdentifiers[optionNumber])
    }} className={`${isOptionChosen && correctOption===optionNumber  ? 'bg-green-500 text-white' : ''} ${isOptionChosen && correctOption!=optionNumber  ? 'bg-red-500 text-white' : ''} text-xl text-cyan-900 font-bold border-2 border-cyan-600 border-dashed p-3 rounded-md  ${isOptionChosen ? 'cursor-default' : 'cursor-pointer hover:bg-cyan-800 hover:border-cyan-700 hover:text-white duration-700'}  `}>
       {optionIdentifiers[optionNumber]}. {description}
    </button>
  )
}

export default Option
