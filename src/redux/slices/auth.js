import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../pages/axios";

export const fetchAuth = createAsyncThunk('/auth/fetchAuth', async (params) => {
        try {
            const {data} = await axios.post('/auth/login', params);
            return data
        } catch (error) {
            throw error;
        }
    })



const initialState = {
    data: null,
    status:'loading'
}


const authSlice = createSlice({
    name:'auth',
    initialState,
    extraReducers:{
        [fetchAuth.pending]: (state)=>{
            state.data = null;
            state.status = 'loading';
        },
        [fetchAuth.fulfilled]: (state, action)=>{
            state.data = action.payload;
            state.status = 'loaded';
        },
        [fetchAuth.rejected]: (state)=>{
            state.data = null;
            state.status = 'error';
        }
    }
})

export const selectIsAuth = state=>Boolean(state.auth.data)

export const authReducer = authSlice.reducer;