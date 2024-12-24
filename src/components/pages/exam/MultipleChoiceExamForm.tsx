"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHook";
import { GetQuestionsApi } from "@/redux/Exam/getQuestionsReducer";
import { useParams } from "next/navigation";
import { takeExamApi } from "@/redux/Exam/takeExamReducer";
import ResultModel from "./ResultModel";


const questionSchema = z
  .object({
    questionText: z.string().optional(),
    options: z
      .array(z.string()).optional(),
    selectedAnswer: z
      .string({message: "Please select an answer"})
      .min(0)
  });

const formSchema = z.object({
  id:string().optional(),
  title: z.string().optional(),
  questions: questionSchema.array(),
});

export type FormInputs = z.infer<typeof formSchema>;
type Questions = z.infer<typeof questionSchema>;

const MultipleChoiceExamForm: React.FC = () => {
  const { data:result } = useAppSelector((state) => state.takeExamReducer);
  const { data } = useAppSelector((state) => state.GetQuestionsReducer);

  const dispatch = useAppDispatch();
  const params = useParams();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: data,
  });

  const onSubmit = (formData: FormInputs) => {
      const newData = {
        ...formData,
        id: params.id as string,
      }

      console.log(newData,"formData")

    dispatch(takeExamApi(newData)).then(()=>{
        
    });
  };


  const handleRadioClick = (questionIndex: number, optionIndex: number) => {
    const currentValue = watch(`questions.${questionIndex}.selectedAnswer`);
    if (currentValue === String(optionIndex)) {
      setValue(`questions.${questionIndex}.selectedAnswer`, "");
    } else {
      setValue(`questions.${questionIndex}.selectedAnswer`, String(optionIndex));
    }
  };

  useEffect(() => {
    dispatch(GetQuestionsApi({ id: params.id as string }));

    return ()=>{
        window.location.reload()
    }
  }, [dispatch, params.id]);

  if (!data) {
    return (
      <div className="h-screen w-full text-3xl font-bold flex justify-center items-center">
        No Exam Available
      </div>
    );
  }

  return (
    <>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-800">{data.title}</h1>
      {data.questions?.map((question: Questions, index: number) => (
        <div
          key={index}
          className="p-4 border rounded-lg bg-gray-50 shadow-sm space-y-4"
        >
          <p className="text-lg font-medium text-gray-800">
            {index + 1}. {question.questionText}
          </p>
          <div className="space-y-2">
            { question?.options && question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center">
                <input
                  id={`question-${index}-option-${optionIndex}`}
                  type="radio"
                  value={optionIndex}
                  onClick={() => handleRadioClick(index, optionIndex)}
                  {...register(`questions.${index}.selectedAnswer`)}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor={`question-${index}-option-${optionIndex}`}
                  className="ml-3 text-gray-700 text-sm"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          {errors.questions?.[index]?.selectedAnswer && (
            <p className="text-red-500 text-sm">
              {errors.questions[index].selectedAnswer.message}
            </p>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Submit Exam
      </button>
    </form>
    { result.exam && <ResultModel result={result}/>}
    </>
  );
};

export default MultipleChoiceExamForm;
