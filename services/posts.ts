import axiosClient from './axiosClient'

const url = '/arts'

const postsService = {
  getPosts: async (page: number = 1, perPage: number = 6) => {
    return await axiosClient.get(`${url}?page=${page}&perPage=${perPage}`)
  },
  getPost: async (id: number) => {
    return await axiosClient.get(`${url}/${id}`)
  },
  getPostIds: async () => {
    let resp = await axiosClient.get(`${url}/ids`)
    return resp.data
  },
}
// https://local-rad-stack.com/api/v1/arts/ids
export default postsService
