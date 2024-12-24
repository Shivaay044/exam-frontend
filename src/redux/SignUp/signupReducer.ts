/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import toast from "react-hot-toast";




interface SignUpState {
  data: any;
  error: boolean;
  isLoading: boolean;
}

const initialState: SignUpState = {
  data:{},
  error:false,
  isLoading:false
}

type SignUpFields = {
    name:string;
    email:string;
    password:string;
};

export const signUpApi = createAsyncThunk(
  "SignUp",
  async(data: SignUpFields,{rejectWithValue}) =>{
      try {
          const response = await axios.post(`http://localhost:8000/api/auth/register`,data)
          if(response?.data?.token){
            toast.success(response?.data?.msg);
            }
          return await response.data;
      } catch (error: any) {
        toast.error(error.response?.data?.msg);
          rejectWithValue(error.response?.data);
      }
  }
);


const signUpSlice = createSlice({
  name:"SignUp",
  initialState,
  reducers: {},
  extraReducers:(builder) =>{
      builder
            .addCase(signUpApi.pending,(state) => {
              state.isLoading = true;
              state.error = false;
            })
            .addCase(signUpApi.fulfilled, (state,action: PayloadAction<Record<string, any>>)=>{
              state.isLoading = false;
              state.data = action.payload;
              state.error = false;
            })
            .addCase(signUpApi.rejected,(state)=>{
              state.isLoading = false;
              state.error = true;
            })
  }
})


const signUpReducer = signUpSlice.reducer;
export default signUpReducer;