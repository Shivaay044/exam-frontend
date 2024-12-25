"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const idSchema = z.object({
  id: z
    .string()
    .nonempty("ID is required")
    .regex(/^[0-9a-fA-F]{24}$/, "ID must be a valid Exam ID"),
});

type IdFormInputs = z.infer<typeof idSchema>;

const IdForm: React.FC = () => {

    const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdFormInputs>({
    resolver: zodResolver(idSchema),
  });

  const onSubmit = (data: IdFormInputs) => {
    // toast.success(`ID submitted successfully: ${data.id}`);
      router.push(`/exam/${data.id}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      <h1 className="text-2xl font-bold text-gray-800">Enter Exam ID</h1>

      <div className="space-y-2">
        <label htmlFor="id" className="block text-sm font-medium text-gray-700">
          ID
        </label>
        <input
          type="text"
          id="id"
          {...register("id")}
          className={`block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            errors.id ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.id && (
          <p className="text-red-500 text-sm">{errors.id.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default IdForm;
