import {createAction, createSlice, createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import { getTagsThunk } from './tagsThunks'
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
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getTagsThunk.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getTagsThunk.rejected, (state) => {
      state.loading = false
    })

    builder.addCase(getTagsThunk.fulfilled, (state, { payload }) => {
      state.loading = false
        state.data= payload.items
    })
  },
})

export const selectTagsList = (state: RootState) => state.tags.data

export const getTags = getTagsThunk

export default tagsSlice.reducer
