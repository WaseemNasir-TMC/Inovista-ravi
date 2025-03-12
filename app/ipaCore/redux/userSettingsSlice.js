import { createSlice } from '@reduxjs/toolkit'

// Redux User Settings Slice
export const userSettingsSlice = createSlice({
   name: 'userSettings',
   initialState: {
      occupation: '',
      experience: 0,
      title: ''
   },
   reducers: {
      setUserSettings: (state, action) => {
         state.occupation = action.payload.occupation
         state.experience = action.payload.experience
         state.title = action.payload.title
      }
   }
})

export const { setUserSettings } = userSettingsSlice.actions

export default userSettingsSlice.reducer