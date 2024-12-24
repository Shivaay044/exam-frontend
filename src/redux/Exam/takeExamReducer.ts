/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/config/axios.config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import toast from "react-hot-toast";




interface Initial {
  data: any;
  error: boolean;
  isLoading: boolean;
}

const initialState: Initial = {
  data:{},
  error:false,
  isLoading:false
}


type Questions = 
    {
        questionText?:string;
        options?:string[];
        selectedAnswer:string;
    }


type Exam = {
  title?:string;
  questions:Questions[];
  id:string
};

export const takeExamApi = createAsyncThunk(
  "TakeExam",
  async(data: Exam,{rejectWithValue}) =>{
      try {
          const response = await instance.post(`/exam/${data.id}`,data)
          return await response.data;
      } catch (error: any) {
          toast.error(error.response?.data?.msg);
          rejectWithValue(error.response?.data);
      }
  }
);


const takeExamSlice = createSlice({
  name:"TakeExam",
  initialState,
  reducers: {},
  extraReducers:(builder) =>{
      builder
            .addCase(takeExamApi.pending,(state) => {
              state.isLoading = true;
              state.error = false;
            })
            .addCase(takeExamApi.fulfilled, (state,action: PayloadAction<Record<string, any>>)=>{
              state.isLoading = false;
              state.data = action.payload;
              state.error = false;
            })
            .addCase(takeExamApi.rejected,(state)=>{
              state.isLoading = false;
              state.error = true;
            })
  }
})


const takeExamReducer  = takeExamSlice.reducer;
export default takeExamReducer;