import { uiActions } from "./ui-slice";


// add item to cart 

import { createSlice } from "@reduxjs/toolkit";
// totalQuantity-> all the cart elements summed up 
// not the len of arr 

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload
            const existingItem = state.items.find(item => newItem.id === item.id)
            state.totalQuantity++
            state.totalPrice = state.totalPrice + newItem.price
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            } else {
                existingItem.quantity++
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            }
        },
        removeItemToCart(state, action) {
            const id = action.payload
            const existingItem = state.items.find(currentItem => currentItem.id === id)
            state.totalQuantity--
            state.totalPrice = state.totalPrice - existingItem.price
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                existingItem.quantity--
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
            }
        },
    }
})

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'sending...',
            message: 'sending cart data!'

        }))
        const sendRequest = async () => {
            const response = await fetch('https://react-http-2956c-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart)
            })

            if (!response.ok) {

                throw new Error('sending cart data failed')
            }
        }
        try {
            await sendRequest()
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'success...',
                message: 'sent cart data!'
         
              }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'sending cart data Failed!'
              }))
        }
    }
}
export const cartActions = cartSlice.actions
export default cartSlice