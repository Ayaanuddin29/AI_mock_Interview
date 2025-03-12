'use client'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';
import { db } from '@/utils/db';
import { UserAnswere } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAnsSection({ mockInterviewQuestion, activeQuestion, interviewData }) {
    const [userAnswere, setUserAnswere] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    
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

    // Append new results to answer
    useEffect(() => {
        if (results.length > 0) {
            setUserAnswere(prevAns => prevAns + ' ' + results.map(result => result.transcript).join(' '));
            setResults([]);  // Clear results after appending
        }
    }, [results]);
    useEffect(() => {
      if (results.length > 0) {
          setUserAnswere(results.map(result => result.transcript).join(' '));  // Replace instead of append
          setResults([]);  // Clear results after storing
      }
  }, [results]);
  
    // Auto-save answer after recording stops
    useEffect(() => {
        if (!isRecording && userAnswere.length > 10) {
            UpdateUserAnswere();
        }
    }, [isRecording]);

    const StartStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            startSpeechToText();
        }
    };

    const UpdateUserAnswere = async () => {
        console.log("User Answer:", userAnswere);
        setLoading(true);

        const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestion]?.question}, User Answer: ${userAnswere}. Based on this, provide a rating and feedback in JSON format with fields "rating" (1-10) and "feedback" (3-5 lines).`;

        try {
            const result = await chatSession.sendMessage(feedbackPrompt);
            const rawResponse = await result.response.text();
            const formattedResponse = rawResponse.replace('```json', '').replace('```', '');

            let JsonFeedbackResp;
            try {
                JsonFeedbackResp = JSON.parse(formattedResponse);
            } catch (err) {
                console.error("Error parsing AI response:", err);
                toast("Error parsing AI feedback. Try again.");
                setLoading(false);
                return;
            }

            const response = await db.insert(UserAnswere).values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestion]?.question,
                correctAns: mockInterviewQuestion[activeQuestion]?.answer,
                userAns: userAnswere,
                feedback: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY'),
            });

            if (response) {
                toast('User Answer Recorded Successfully');
                setUserAnswere('');
            }

            setResults([]);
            setLoading(false);
        } catch (error) {
            console.error("Error updating answer:", error);
            toast("Failed to save answer. Try again.");
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5'>
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 100,
                    }}
                />
            </div>
            <Button disabled={loading} variant='outline' onClick={StartStopRecording}>
                {isRecording ? (
                    <h2 className='text-red-600 flex gap-2 text-bold'>
                        <StopCircle /> Stop Recording
                    </h2>
                ) : (
                    <h2 className='text-primary flex text-bold gap-2 font-bold'>
                        <Mic /> Record Answer
                    </h2>
                )}
            </Button>
        </div>
    );
}

export default RecordAnsSection;
