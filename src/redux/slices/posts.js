import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../pages/axios.js'


export const fetchPosts = createAsyncThunk('/posts/fetchPosts', async () => {
    try {
      const {data} = await axios.get('/posts');
      return data;
    } catch (error) {
      throw error; 
    }
  },{
    serializeErrors: error=>{
      return error.message
    }
  });

  export const fetchTags = createAsyncThunk('/tags/fetchTags', async () => {
    try {
      const {data} = await axios.get('/tags');
      return data
    } catch (error) {
      throw error;
    }
  })  

const initialState = {
    posts:{
        items:[],
        status:'loading',
    },
    tags:{
        items:[],
        status:'loading',
    }

};


const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchPosts.pending]: (state)=>{
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action)=>{
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state)=>{
            state.posts.items = [];
            state.posts.status = 'error';
        },
        [fetchTags.pending]:(state)=>{
          state.tags.items = [];
          state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]:(state, action)=>{
          state.tags.items = action.payload;
          state.tags.status = 'loaded';
        },
        [fetchTags.rejected]:(state)=>{
          state.tags.items = [];
          state.tags.status = 'error';
        }
    }
})

export const postReducer = postsSlice.reducer;