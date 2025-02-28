'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import useSpeechToText from 'react-hook-speech-to-text';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Mic, Mic2, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';
import { db } from '@/utils/db';
import { UserAnswere, UserAnsweres } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
function RecordAnsSection({mockInterviewQuestion,activeQuestion,interviewData}) {
    const [userAnswere,setUserAnswere]=useState('');
    const {user}=useUser();
    const [loading,setLoading]=useState(false)
        const {
          error,
          interimResult,
          isRecording,
          results,
          startSpeechToText,
          stopSpeechToText,
          setResults,
        } = useSpeechToText({
          continuous: true,
          useLegacyResults: false
        });
    useEffect(()=>{
       results.map((result)=>(
        setUserAnswere(prevAns=>prevAns+result.transcript)
       ))
    },[results])

    useEffect(()=>{
       if(!isRecording&&userAnswere.length>10){
       UpdateUserAnswere();
       }
    },[userAnswere])


  const StartStopRecording=async()=>{
    if(isRecording){
        stopSpeechToText();
    }
    else{
        startSpeechToText();
  }
}
  const UpdateUserAnswere=async()=>{
    console.log(userAnswere)
    setLoading(true);
    const feedbackPrompts="Question"+mockInterviewQuestion[activeQuestion]?.question+", User Answere:"+userAnswere+", Depends on question and user answere"+"please give us rating for answer and feedback as area of imporvement if any"+"in just 3 to 5 lines to impove it in JSON format with rating field and feedback";
    const result=await chatSession.sendMessage(feedbackPrompts);
    const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');
    console.log(mockJsonResp)
    const JsonFeedbackResp=JSON.parse(mockJsonResp);
    const resp=await db.insert(UserAnswere).values({
      mockIdRef:interviewData?.mockId,
      question:mockInterviewQuestion[activeQuestion]?.question,
      correctAns:mockInterviewQuestion[activeQuestion]?.answer,
      userAns:userAnswere,
      feedback:JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail:user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD-MM-YYYY')
    })
    if(resp){
      toast('User Answere Recorded Successfully')
      setUserAnswere('');
      // setResults([])
    }
    setResults([])
    setLoading(false);

}
  return (
    <div className='flex items-center justify-center flex-col'>
    <div className='flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5'>
        {/* <Image src={'/pixel_camera.htm'} width={200} height={200} alt='img' className='absolute'/> */}
      <Webcam 
      mirrored={true}
      style={{
        height:300,
        width:'100%',
        zIndex:100,
      }}
      />
    </div>
      <Button disabled={loading} variant='outline' onClick={StartStopRecording} >
        {isRecording ?<h2 className='text-red-600 flex gap-2 text-bold'>
            <StopCircle/>Stop Recording
        </h2>:
        <h2 className=' text-primary flex text-bold gap-2 font-bold'><Mic/> Record Answere</h2>
        }
       </Button>
    </div>
  )
}

export default RecordAnsSection