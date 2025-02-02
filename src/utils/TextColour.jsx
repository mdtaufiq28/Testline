import React from 'react'

const TextColour = ({string}) => {
  function textColour(string){
    let stringLen=string.len;
    let colourDefinition=new Array(stringLen).fill(false);
    for(let i=0;i<stringLen;i++){
      let randomChar=Math.floor(Math.random()*stringLen);
      if(!colourDefinition[randomChar]){
        
      }
    }
    string.forEach((letter)=>{
    })
  }
  return (
    <div>
      
    </div>
  )
}

export default TextColour
