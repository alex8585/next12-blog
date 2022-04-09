import axiosClient from './axiosClient'

const url = '/tags'

const tagsService = {
  getTags: async () => {
    return await axiosClient.get(url)
  },
}
export default tagsService

