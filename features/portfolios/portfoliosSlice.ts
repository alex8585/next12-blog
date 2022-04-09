import { createSlice, createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import { getPortfoliosThunk } from './portfoliosThunks'
import { RootState } from '../store'

interface PortfolioState {
  data:[] 
  loading: boolean
  page: number
  total: number
  perPage: number
}


const initialState = {
  data: [],
  loading: false,
} as PortfolioState

export const counterSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPortfoliosThunk.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getPortfoliosThunk.rejected, (state) => {
      state.loading = false
    })

    builder.addCase(getPortfoliosThunk.fulfilled, (state, { payload }) => {
      state.loading = false
      state.data = payload.data
      state.page = payload.page
      state.total = payload.total
      state.perPage = payload.perPage
    })
  },
})

export const selectPortfoliosList = (state: RootState) => state.portfolios.data

export const getPortfolios = getPortfoliosThunk

export default counterSlice.reducer
