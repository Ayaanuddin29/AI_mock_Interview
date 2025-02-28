"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import {v4 as uuidv4} from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading,setLoading]=useState(false);
  const [jsonResponse,setJsonResponse]=useState();
  const {user}=useUser();
  const router=useRouter();
  const onSubmit = async(e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);
    // setOpenDialog(false); // Close dialog after submission
    const InputPromt="Job Position:"+jobPosition+" Job Description: "+jobDesc+", Years of Experience:"+jobExperience+" Based on this information, please give me 5 interview questions with answers in JSON format. Provide question and answer as fields in JSON."
    const result=await chatSession.sendMessage(InputPromt)
    const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
    console.log(JSON.parse(MockJsonResp))
    setJsonResponse(MockJsonResp)
    if(MockJsonResp){
      const resp=await db.insert(MockInterview).values({
        mockId:uuidv4(),
        jsonMockResp:MockJsonResp,
        jobPosition:jobPosition,
        jobDesc:jobDesc,
        jobExperience:jobExperience,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-YYYY')
      }).returning({mockId:MockInterview.mockId})
      console.log("Inserted ID:",resp)
      if(resp){
        setOpenDialog(false);
        router.push('/dashboard/interview/'+resp[0]?.mockId)
      }
    }
    else{
      console.log(error)
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job Interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about your job position/role, job description,
                    and years of experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label className="block font-medium">
                      Job Role/Job Position
                    </label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label className="block font-medium">
                      Job Description/Tech Stack (In Short)
                    </label>
                    <Textarea
                      placeholder="Ex. React, Angular, Node.js"
                      required
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label className="block font-medium">
                      Years of Experience
                    </label>
                    <Input
                      placeholder="5"
                      type="number"
                      required
                      max={50}
                      value={jobExperience}
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    className="bg-red-500 hover:bg-red-300"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading?
                    <>
                    <LoaderCircle className="animate-spin"/>'Generating from AI'</>:'Start Invterview'
                    
                  }
                    </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;