import { configureStore } from '@reduxjs/toolkit'
import wishlist from "./features/wishlist"

export const store = configureStore({
  reducer: {
    wishlist
  },
})