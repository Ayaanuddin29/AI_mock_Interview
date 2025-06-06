"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard';
import TawkToChat from './TawkToChat';

function InterviewList() {
    const {user}=useUser();
    const [interviewList,setInterviewList]=useState([])
    useEffect(()=>{
       user && GetInterviewList()
    },[user])
    const GetInterviewList=async()=>{
        const result=await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id));
        console.log(result)
        setInterviewList(result)
    }
  return (
    <div>
      <h2 className='font-medium text-xl'>Previous Mock Inteview</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 my-3'>
        {interviewList && interviewList.map((interview,index)=>(
            <InterviewCard
            interview={interview}
            key={index}/>
        ))}
        
<TawkToChat/>

      </div>
    </div>
  )
}

export default InterviewList
