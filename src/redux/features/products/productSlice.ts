import {PayloadAction, createSlice } from "@reduxjs/toolkit";
interface Iproduct{
    status:boolean,
    priceRange:number

}
const initialState:Iproduct={
    status:false,
    priceRange:0,
}
const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
        toggleStatus:(state)=>{
            state.status=!state.status
        },
        setPriceRange:(state,action:PayloadAction<number>)=>{
            state.priceRange=action.payload

        }

    }
})
export default productSlice.reducer
export const {toggleStatus,setPriceRange}=productSlice.actions