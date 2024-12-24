"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

type Result = {
  user: string;
  exam: string;
  answers: number[];
  score: number;
  passed: boolean;
  out:number
};

export default function ResultModel({result}:{result:Result}) {
   
  const router = useRouter()
    
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
          <h2 className="text-xl font-bold mb-4 text-center">Result</h2>
          <div className="space-y-4">
            <p>
              <strong>User ID:</strong> {result.user}
            </p>
            <p>
              <strong>Exam ID:</strong> {result.exam}
            </p>
            <p>
              <strong>Score:</strong> {result.score}
            </p>
            <p>
              <strong>Out of:</strong> {result.out}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  result.passed ? "text-green-500" : "text-red-500"
                }`}
              >
                {result.passed ? "Passed" : "Failed"}
              </span>
            </p>
            <button className='text-center bg-blue-500 px-4 py-2 rounded-xl mx-auto' onClick={()=>router.push("/enter-id")}>Go Back</button>
          </div>
        </div>
      </div>
  )
}
