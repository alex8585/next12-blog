import axiosClient from './axiosClient'

const url = '/arts'


const postsService = {
    getPosts: async (page:number=1,perPage:number=6) => {
    return await axiosClient.get(`${url}?page=${page}&perPage=${perPage}`)
  },
}



export default postsService

