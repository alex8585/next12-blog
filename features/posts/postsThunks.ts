import { createAsyncThunk } from '@reduxjs/toolkit'

import postsService from '../../services/posts'

interface PostsQuery {
  page?: number
  perPage?: number
}
interface PostsResp {
  page: number
  perPage: number
  items: []
  total: number
}


export const getPostsThunk = createAsyncThunk<PostsResp,PostsQuery>('posts/getPosts', async ({page=1, perPage=6}) => {
   const res = await postsService.getPosts(page,perPage)
   return res.data 
})
