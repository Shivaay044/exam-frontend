/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/config/axios.config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"




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
        questionText:string;
        options:string[];
        correctAnswer:number;
    }


type Exam = {
  title:string;
  questions:Questions[];
};

export const addExamApi = createAsyncThunk(
  "AddExam",
  async(data: Exam,{rejectWithValue}) =>{
      try {
          const response = await instance.post(`/exam/add`,data)
          return await response.data;
      } catch (error: any) {
        //   toast.error(error.response?.data?.msg);
          rejectWithValue(error.response?.data);
      }
  }
);


const addExamSlice = createSlice({
  name:"AddExam",
  initialState,
  reducers: {},
  extraReducers:(builder) =>{
      builder
            .addCase(addExamApi.pending,(state) => {
              state.isLoading = true;
              state.error = false;
            })
            .addCase(addExamApi.fulfilled, (state,action: PayloadAction<Record<string, any>>)=>{
              state.isLoading = false;
              state.data = action.payload;
              state.error = false;
            })
            .addCase(addExamApi.rejected,(state)=>{
              state.isLoading = false;
              state.error = true;
            })
  }
})


const addExamReducer = addExamSlice.reducer;
export default addExamReducer;