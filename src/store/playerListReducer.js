import { createSlice } from '@reduxjs/toolkit'
import { PLAYERLIST } from '../component/util'

export const playerListSlice = createSlice({
    name: PLAYERLIST,
    initialState: [],
    reducers: {
        initPlayerState: (state) => {
            try {
                const players = localStorage.getItem(PLAYERLIST)
                state = JSON.parse(players)
                const length = state.length
                console.log({ length })
            }
            catch {
                state = []
            }
            return state
        },
        addPlayer: (state, { payload: player }) => {
            state.push(player)
            return state
        },
        removePlayer: (state, { payload: playerName }) => {
            state = state.filter(player => {
                return player.name !== playerName
            })
            return state
        },
        updateBuying: (state, { payload }) => {
            const { playerName, buying } = payload
            state = state.map(player => {
                if (player.name === playerName) {
                    return {
                        ...player, buying: player.buying + buying
                    }

                }
                return player
            })
            return state
        },
        updateReturning: (state, { payload }) => {
            const { playerName, returning } = payload
            state = state.map(player => {
                if (player.name === playerName) {
                    console.log("update returning")
                    return {
                        ...player, returning
                    }

                }
                return player
            })
            return state
        },
        updateState: (state, { payload }) => {
            const { playerName, status } = payload
            state = state.map(player => {
                if (player.name === playerName) {
                    return {
                        ...player, status
                    }

                }
                return player
            })
            return state
        }

    },
})

// Action creators are generated for each case reducer function
export const { initPlayerState, addPlayer, removePlayer, updateBuying, updateReturning, updateState } = playerListSlice.actions

export default playerListSlice.reducer