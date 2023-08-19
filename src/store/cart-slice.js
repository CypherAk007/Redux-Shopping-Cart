// add item to cart 

import { createSlice } from "@reduxjs/toolkit";
// totalQuantity-> all the cart elements summed up 
                    // not the len of arr 

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[],
        totalQuantity:0,
        totalPrice:0,
    },
    reducers:{
        addItemToCart(state,action){
            const newItem = action.payload
            const existingItem = state.items.find(item=>newItem.id===item.id)
            state.totalQuantity++
            if (!existingItem){
                state.items.push({
                    id:newItem.id,
                    price:newItem.price,
                    quantity:1,
                    totalPrice:newItem.price,
                    name:newItem.title
                })
            }else{
                existingItem.quantity++
                existingItem.totalPrice =existingItem.totalPrice+newItem.price
            }
        },
        removeItemToCart(state,action){
            const id = action.payload 
            const existingItem = state.items.find(currentItem=> currentItem.id===id)
            state.totalQuantity--
            if (existingItem.quantity===1){
                state.items = state.items.filter(item=>item.id!==id)
            }else{
                existingItem.quantity--
                existingItem.totalPrice = existingItem.totalPrice-existingItem.price
            }
        },
    }
})

export const cartActions = cartSlice.actions
export default cartSlice