import {
  createAction,
  createSlice,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit'
import { getPostsThunk, getPostThunk } from './postsThunks'
import { RootState } from '../store'

// interface Tag {
//   id: number
//   name: string
// }

interface PostsState {
  data: []
  loading: boolean
  post: Object
}

const initialState = {
  post: {},
  data: [],
  loading: false,
} as PostsState

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
      state.data = payload.items
    })

    builder.addCase(getPostThunk.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getPostThunk.rejected, (state) => {
      state.loading = false
    })

    builder.addCase(getPostThunk.fulfilled, (state, { payload }) => {
      state.loading = false
      state.post = payload
    })
  },
})

export const selectPostsList = (state: RootState) => state.posts.data
export const selectPost = (state: RootState) => state.posts.post

export const getPosts = getPostsThunk
export const getPost = getPostThunk

export default tagsSlice.reducer
