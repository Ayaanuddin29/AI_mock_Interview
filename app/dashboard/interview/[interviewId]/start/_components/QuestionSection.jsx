import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionSection({mockInterviewQuestion,activeQuestion,setActiveQuestion}) {
  const textToSpeach=(text)=>{
    if('speechSynthesis' in window){
      const speech=new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
    else{
      alert('Sorry,Your Browser doesnot support')
    }
  }
  return mockInterviewQuestion && (
    <div className='p-5 border rounded-lg my-10'>
     <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ' >
        {mockInterviewQuestion && mockInterviewQuestion.map((question,index)=>(
            <h2 className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestion===index && 'bg-blue-800 text-white'}`} onClick={()=>setActiveQuestion(index)}>Question #{index+1}</h2>
        ))}

     </div>
     <h2 className='my-5 text-sm md:text-lg '>{mockInterviewQuestion[activeQuestion]?.question}</h2>
     <Volume2 className='cursor-pointer' onClick={()=>textToSpeach(mockInterviewQuestion[activeQuestion]?.question)}/>
     <div className='border rounded-lg p-5 bg-blue-100 text-primary-600 mt-10'>
        <h2 className='flex gap-2 items-center'><Lightbulb/>
        <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-primary my-2'>Enable Video Web Cam and Microphone to Start your AI Generated Mock Interview,it Has 5 question which you can answere and last you get the report to correct the Mistakes.</h2>
     </div>
    </div>
  )
}

export default QuestionSection