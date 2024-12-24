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

type Data = {
    id:string;
}


export const GetQuestionsApi = createAsyncThunk(
  "GetQuestions",
  async(data:Data,{rejectWithValue}) =>{
      try {
          const response = await instance.get(`/exam/${data.id}`)
          return await response.data;
      } catch (error: any) {
          toast.error(error.response?.data?.message);
          window.location.href = "/enter-id";
          rejectWithValue(error.response?.data);
      }
  }
);


const GetQuestionsSlice = createSlice({
  name:"GetQuestions",
  initialState,
  reducers: {
    resetState:() => initialState,
  },
  extraReducers:(builder) =>{
      builder
            .addCase(GetQuestionsApi.pending,(state) => {
              state.isLoading = true;
              state.error = false;
            })
            .addCase(GetQuestionsApi.fulfilled, (state,action: PayloadAction<Record<string, any>>)=>{
              state.isLoading = false;
              state.data = action.payload;
              state.error = false;
            })
            .addCase(GetQuestionsApi.rejected,(state)=>{
              state.isLoading = false;
              state.error = true;
            })
  }
})


const GetQuestionsReducer  = GetQuestionsSlice.reducer;
export const { resetState } = GetQuestionsSlice.actions;
export default GetQuestionsReducer;