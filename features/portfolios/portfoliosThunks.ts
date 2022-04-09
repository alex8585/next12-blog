import { createAsyncThunk } from '@reduxjs/toolkit'
import  portfoliosService  from '../../services/portfolios'

function arrayToTagsFilter(tags: Array<number>) {
  if (!tags) {
    return ''
  }
  return tags.map((val) => val).join(',')
}

interface PortfolioQuery {
  page?: number
  perPage?: number
  tags?: number[]
}
interface PortfoliosResp {
  page: number
  perPage: number
  data: []
  total: number
}

export const getPortfoliosThunk = createAsyncThunk<
  PortfoliosResp,
  PortfolioQuery
>('portfolios/getPortfolios', async ({ page = 1, perPage = 5, tags = [] }) => {
  const tf = arrayToTagsFilter(tags)

     const res = await portfoliosService.getPortfolios(page, perPage, tf)
  // console.log(response.data)
  const result = {
    page,
    perPage,
    data: res.data.items,
    total: res.data.total,
  }
  return result
})
