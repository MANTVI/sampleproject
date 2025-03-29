
'use client';
import {createSlice, nanoid } from '@reduxjs/toolkit';



const initialState = {
    status:false,
    userData:null
 
}

const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{ 
       
      
        login:(state,action)=>{
            state.status=true;
            const { password, ...userData } = action.payload; // Exclude password
            state.userData= userData; // change user data
            // localStorage.setItem('user', JSON.stringify(state));
        },
       

        logout:(state)=>{
            state.status=false;
            state.userData=null;
            // localStorage.removeItem('user');

        }
    }
})

export const {logout,login}=authSlice.actions;
export default authSlice.reducer;
