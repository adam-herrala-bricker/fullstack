import { createSlice } from '@reduxjs/toolkit'

//this is for toggling the view of the create mode
const viewSlice = createSlice({
  name : 'view',
  initialState : false,
  reducers : {
    toggleView(state, action) {
      return !state
    }
  }
})

export const { toggleView } = viewSlice.actions

export default viewSlice.reducer