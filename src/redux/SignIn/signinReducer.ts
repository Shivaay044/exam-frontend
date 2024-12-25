/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
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

type SignInFields = {
    email:string;
    password:string;
};

export const signInApi = createAsyncThunk(
  "SignIn",
  async(data: SignInFields,{rejectWithValue}) =>{
      try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_baseURL}/api/auth/login`,data)
          if(response?.data?.token){
            toast.success(response?.data?.msg);
            localStorage.setItem("Token",response?.data?.token);
            localStorage.setItem("Role",response?.data?.role);
             if (response?.data?.role == "admin") {
                window.location.href = "/add-exam";
            } else {
                window.location.href = "/enter-id";
            }
          }
          return await response.data;
      } catch (error: any) {
          toast.error(error.response?.data?.msg);
          rejectWithValue(error.response?.data);
      }
  }
);


const signInSlice = createSlice({
  name:"SignIn",
  initialState,
  reducers: {},
  extraReducers:(builder) =>{
      builder
            .addCase(signInApi.pending,(state) => {
              state.isLoading = true;
              state.error = false;
            })
            .addCase(signInApi.fulfilled, (state,action: PayloadAction<Record<string, any>>)=>{
              state.isLoading = false;
              state.data = action.payload;
              state.error = false;
            })
            .addCase(signInApi.rejected,(state)=>{
              state.isLoading = false;
              state.error = true;
            })
  }
})


const signInReducer = signInSlice.reducer;
export default signInReducer;