"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb,  WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null); // Ensure it's initialized as null
  const [webCamEnabled, setWebCamEnabled] = useState(false); // Default value should be false

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []); // Added dependency to prevent stale closures

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result.length > 0) {
        setInterviewData(result[0]); // Set the first entry as interview data
      } else {
        console.warn("No interview data found");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex flex-col my-5 gap-5 ">
      <div className="p-5 flex flex-col rounded-lg border gap-5">
      <h2 className="text-lg">
          <strong>Job Role/Job Position:</strong> {interviewData?.jobPosition || "Loading..."}
        </h2>
        <h2 className="text-lg">
          <strong>Job Description</strong> {interviewData?.jobDesc || "Loading..."}
        </h2>
        <h2 className="text-lg">
          <strong>Year's Of Experience</strong> {interviewData?.jobExperience || "Loading..."}
        </h2>
      </div>
      <div className="p-5 border rounded-lg border-yellow-500 bg-yellow-200">
       <h2 className="flex gap-2 items-center text-yellow-500"><Lightbulb /><strong>Information</strong></h2>
        <h2 className="text-yellow-600">Enable Video Web Cam and Microphone to Start your AI Generated Mock Interview,it Has 5 question which you can answere and last you get the report to correct the Mistakes.</h2>
      </div>
      </div>
      <div>
        {webCamEnabled ? (
          <Webcam
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
            mirrored={true}
            style={{
              height: 400,
              width: 400,
            }}
          />
        ) : (
          <div className="flex justify-center items-center flex-col">
            <WebcamIcon className="h-72 w-full p-20 bg-secondary rounded-lg border my-7" />
            <Button variant='ghost' className="text-center flex justify-center flex-col" onClick={() => setWebCamEnabled(true)}>
              Enable Web Cam and Microphone
            </Button>
          </div>
        )}
      </div>
      </div>
      <div className="flex justify-end items-end">
      <a href={'/dashboard/interview/'+params.interviewId+'/start'}>
      <Button>Start Interview</Button>
      </a>
      </div>
    </div>
  );
}

export default Interview;