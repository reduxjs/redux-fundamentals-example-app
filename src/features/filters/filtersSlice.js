import { createSlice } from '@reduxjs/toolkit'

export const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}

const initialState = {
  status: StatusFilters.All,
  colors: [],
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged(state, action) {
      state.status = action.payload
    },
    colorFilterChanged: {
      reducer(state, action) {
        const { color, changeType } = action.payload
        const { colors } = state

        switch (changeType) {
          case 'added': {
            if (colors.includes(color)) {
              return state
            }

            state.colors.push(color)
            return
          }
          case 'removed': {
            let activeColors = state.colors.filter(
              (existingColor) => existingColor !== color
            )

            state.colors = activeColors
            return
          }
          default:
            return state
        }
      },
      prepare(color, changeType) {
        return {
          payload: { color, changeType },
        }
      },
    },
  },
})

export const { statusFilterChanged, colorFilterChanged } = filtersSlice.actions

export default filtersSlice.reducer
