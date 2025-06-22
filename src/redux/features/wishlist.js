import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
  },
})

export const {  } = wishlistSlice.actions

export default wishlistSlice.reducer