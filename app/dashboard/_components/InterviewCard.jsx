import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function InterviewCard({interview}){
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-800'>{interview?.jobExperience} Year's Of Experience</h2>
        <h2 className='text-xs text-gray-500'>Created At:{interview.createdAt}</h2>
        <div className='flex justify-between mt-2 gap-2'>
          <Link href={'/dashboard/interview/'+interview?.mockId+'/feedback'} className='w-full'>
          <Button className='w-full'  size='sm' variant='outline'>Feedback</Button>
          </Link>
          <Link href={'/dashboard/interview/'+interview?.mockId} className='w-full'>
           <Button size='sm' className='w-full'>Start</Button> 
           </Link>
        </div>
    </div>
  )
}

export default InterviewCard
