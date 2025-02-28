"use client"
import { db } from '@/utils/db';
import { UserAnswere } from '@/utils/schema'
import { eq } from 'drizzle-orm';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible";
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

function feedback() {
    const { interviewId } = useParams();
    const [feedbackList,setFeedbackList]=useState([]);
    const router=useRouter();
    useEffect(()=>{
        GetFeedback();
    },[interviewId])
    const GetFeedback=async()=>{
         const result=await db.select()
         .from(UserAnswere)
         .where(eq(UserAnswere.mockIdRef,interviewId))
         .orderBy(UserAnswere.id);
          console.log(result)
          setFeedbackList(result)
    }
  return (
    <div className='p-10'>
     {feedbackList?.length==0?
    <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Record Found</h2> 
    :<>
    <h2 className='text-3xl font-bold text-green-500'>Congratulation!!</h2>
    <h2 className='font-bold text-2xl'>Here is Your Interview Feedback</h2>
     <h2 className='text-sm text-gray-600'>Find Below Interview question with correct answere,Your answere and feedback for improvement</h2>
    {feedbackList && feedbackList.map((item,index)=>(
      <Collapsible key={index}>
      <CollapsibleTrigger className='p-2 flex justify-between bg-secondary rounded-lg my-2 text-left gap-10 w-full'>
        {item.question}<ChevronsUpDown className='h-5 w-5'/>
        </CollapsibleTrigger>
      <CollapsibleContent>
        
        <div className='flex flex-col gap-2'>
            <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
            <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-400'><strong>Your Answere:</strong>{item.userAns}</h2>
            <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-400'><strong>Correct Answere:</strong>{item.correctAns}</h2>
            <h2 className='p-2 border rounded-lg bg-blue-50 text-primary text-sm'><strong>Feedback:</strong>{item.feedback}</h2>
        </div>
        
      </CollapsibleContent>
    </Collapsible>
    
    ))}
    </>}
    <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
    
  )
}

export default feedback