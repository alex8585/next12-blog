import { createAsyncThunk } from '@reduxjs/toolkit'

import tagsService from '../../services/tags'

export const getTagsThunk = createAsyncThunk('tags/getTags', async () => {
     const res = await tagsService.getTags()
   return res.data 
})
