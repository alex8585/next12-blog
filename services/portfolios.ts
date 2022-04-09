import axiosClient from './axiosClient'

const url = '/portfolios'

const portfoliosService = {
    getPortfolios: async (page:number,perPage:number,tf:string) => {
    return await axiosClient.get(`${url}?page=${page}&perPage=${perPage}&sortBy=order_number&descending=1&tags=${tf}`)
  },
}
export default portfoliosService 

