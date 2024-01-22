import { auth } from "@/lib/firebase";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'


interface IUser{
    user:{
        email:string|null,
    }
    isError:boolean,
    isLoading:boolean,
    error:string|null

}
const initialState:IUser={
    user:{
        email:null
    },
    isError:false,
    isLoading:false,
    error:null

}


interface ICredential{
    email:string,
    password:string
}
export const createUser =createAsyncThunk(
    'user/createUser',
    async ({email,password}:ICredential)=>{
        const data=await createUserWithEmailAndPassword(auth,email,password)
        return data.user.email
    },

)
export const loginUser =createAsyncThunk(
    'user/loginUser',
    async ({email,password}:ICredential)=>{
        const data=await signInWithEmailAndPassword(auth,email,password)
        return data.user.email
    },

)
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action : PayloadAction<string | null>)=>{
            state.user.email=action.payload

        },
        setLoading:(state,action :PayloadAction<boolean>)=>{
            state.isLoading=action.payload

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(createUser.pending,(state)=>{
            state.isLoading=true
            state.isError=false
            state.error=null
            

        }).addCase(createUser.fulfilled,(state,action)=>{
            state.user.email=action.payload
            state.isLoading=false

        }).addCase(createUser.rejected,(state,action)=>{
            state.user.email=null
            state.isError=true
            state.isLoading=false
            state.error=action.error.message!

        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.user.email = action.payload;
            state.isLoading = false;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.user.email = null;
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message!;
          });
    }

})
export const { setLoading,setUser}=userSlice.actions
export default userSlice.reducer