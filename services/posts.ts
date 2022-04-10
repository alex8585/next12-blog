import axiosClient from './axiosClient'

const url = '/arts'

const postsService = {
  getPosts: async (page: number = 1, perPage: number = 6) => {
    return await axiosClient.get(`${url}?page=${page}&perPage=${perPage}`)
  },
  getPost: async (id: number) => {
    return await axiosClient.get(`${url}/${id}`)
  },
}

export default postsService
