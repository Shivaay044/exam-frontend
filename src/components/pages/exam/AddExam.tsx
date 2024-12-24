"use client";
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/redux/reduxHook';
import { addExamApi } from '@/redux/Exam/addExamReducer';

const questionSchema = z.object({
    questionText: z.string().min(1, 'Question text is required'),
    options: z
        .array(z.string().min(1, 'Option cannot be empty'))
        .min(2, 'At least two options are required'),
    correctAnswer: z
        .number()
        .min(0, 'Correct answer index must be valid'),
}).refine(
    (data) => data.correctAnswer < data.options.length,
    { message: 'Correct answer index out of bounds', path: ['correctAnswer'] }
);

const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    questions: z.array(questionSchema).min(1, 'At least one question is required'),
});

type FormInputs = z.infer<typeof formSchema>;

const AddQuestionForm: React.FC = () => {

    const dispatch = useAppDispatch();

    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormInputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            questions: [
                {
                    questionText: '',
                    options: ['', ''],
                    correctAnswer: 0,
                },
            ],
        },
    });

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'questions',
    });

    const onSubmit = (data: FormInputs) => {
        dispatch(addExamApi(data));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Add Exam Questions</h2>
                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Exam Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            {...register('title')}
                            className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {fields.map((item, index) => (
                        <div key={item.id} className="mb-6 border-t pt-4">
                            <div className="mb-4">
                                <label
                                    htmlFor={`questions.${index}.questionText`}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Question Text
                                </label>
                                <input
                                    type="text"
                                    {...register(`questions.${index}.questionText`)}
                                    className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.questions?.[index]?.questionText ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.questions?.[index]?.questionText && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.questions[index]?.questionText?.message}
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Options</label>
                                {item.options.map((_, optionIndex) => (
                                    <div key={optionIndex} className="flex items-center mb-2">
                                        <input
                                            type="text"
                                            {...register(`questions.${index}.options.${optionIndex}`)}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.questions?.[index]?.options?.[optionIndex] ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {optionIndex >= 2 && (
                                            <button
                                                type="button"
                                                className="ml-2 text-red-500 hover:text-red-700"
                                                onClick={() => {
                                                    const updatedOptions = [...fields[index].options];
                                                    updatedOptions.splice(optionIndex, 1);
                                                    update(index, { ...fields[index], options: updatedOptions });
                                                }}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="mt-2 text-blue-500 hover:text-blue-700"
                                    onClick={() => {
                                        const watchField = watch()
                                        const updatedOptions = [...watchField.questions[index].options, ''];
                                        console.log(watchField);
                                        update(index, { ...watchField.questions[index], options: updatedOptions });
                                    }}
                                >
                                    Add Option
                                </button>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor={`questions.${index}.correctAnswer`}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Correct Answer Index
                                </label>
                                <input
                                    type="number"
                                    {...register(`questions.${index}.correctAnswer`, { valueAsNumber: true })}
                                    className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.questions?.[index]?.correctAnswer ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.questions?.[index]?.correctAnswer && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.questions[index]?.correctAnswer?.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="button"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => remove(index)}
                            >
                                Remove Question
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        className="mb-6 text-blue-500 hover:text-blue-700"
                        onClick={() =>
                            append({
                                questionText: '',
                                options: ['', ''],
                                correctAnswer: 0,
                            })
                        }
                    >
                        Add Question
                    </button>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddQuestionForm;
