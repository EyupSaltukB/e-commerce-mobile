import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: "cart",
    initialState: {carts: []},
    reducers: {}
})

export default cartSlice.reducer