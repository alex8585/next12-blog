import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import tagsReducers from './tags/tagsSlice'
import portfoliosReducers from './portfolios/portfoliosSlice'
import postsReducers from './posts/postsSlice'

import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
      tags: tagsReducers,
      portfolios: portfoliosReducers,
      posts: postsReducers,
})

const reducer: any = (state: RootState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    return nextState
  } else {
    return rootReducer(state, action)
  }
}


const store = () =>
  configureStore({
    reducer 
  })

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>

export const wrapper = createWrapper<AppStore>(store)
