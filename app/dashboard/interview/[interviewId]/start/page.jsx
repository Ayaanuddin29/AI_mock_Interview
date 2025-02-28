"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnsSection from "./_components/RecordAnsSection";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation"; // Import useParams
import Link from "next/link"; // Import Link for navigation

function StartInterview() {
  const { interviewId } = useParams(); // Get interviewId from route params
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(0);

  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails();
    }
  }, [interviewId]); // Ensure it runs when interviewId is available

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      if (result.length > 0) {
        const interview = result[0];
        setInterviewData(interview);

        // Parse JSON response safely
        try {
          const jsonMockResp = JSON.parse(interview.jsonMockResp);
          setMockInterviewQuestion(jsonMockResp);
        } catch (parseError) {
          console.error("Error parsing mock interview questions:", parseError);
        }
      } else {
        console.warn("No interview data found");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
        />
        <RecordAnsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestion={activeQuestion}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6 mt-4">
        {activeQuestion > 0 && (
          <Button onClick={() => setActiveQuestion(activeQuestion - 1)}>
            Previous Question
          </Button>
        )}
        {activeQuestion !== mockInterviewQuestion?.length - 1 && (
          <Button onClick={() => setActiveQuestion(activeQuestion + 1)}>
            Next Question
          </Button>
        )}
        {activeQuestion === mockInterviewQuestion?.length - 1 && (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
