import { configureStore } from '@reduxjs/toolkit'

import { PLAYERLIST } from '../component/util'

import playerListReducer from './playerListReducer'


export const store = configureStore({
  reducer: {
    [PLAYERLIST]: playerListReducer,
  },
})


