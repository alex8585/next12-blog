import {createAction, createSlice, createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import { getPostsThunk } from './postsThunks'
import { RootState } from '../store'

// interface Tag {
//   id: number
//   name: string
// }

interface TagsState {
  data:[] 
  loading: boolean
}

const initialState = {
  data:[],
  loading: false,
} as TagsState

export const tagsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getPostsThunk.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getPostsThunk.rejected, (state) => {
      state.loading = false
    })

    builder.addCase(getPostsThunk.fulfilled, (state, { payload }) => {
      state.loading = false
        state.data= payload.items
    })
  },
})

export const selectPostsList = (state: RootState) => state.posts.data

export const getPosts = getPostsThunk

export default tagsSlice.reducer
