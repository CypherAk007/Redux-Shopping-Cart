
import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = ()=>{
    return async (dispatch)=>{

        const fetchData = async()=>{
            const response = await fetch(
                'https://react-http-2956c-default-rtdb.firebaseio.com/cart.json'
            )

            if (!response.ok) {

                throw new Error('Fetch cart data failed')
            }
            const data = await response.json()
            return data 
        }

        try{
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart({
                items:cartData.items || [],
                totalQuantity:cartData.totalQuantity,
                totalPrice:cartData.totalPrice,
            }))

        }catch(error){
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'sending cart data Failed!'
              }))
        }
    }
}

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
                body: JSON.stringify({
                    items:cart.items,
                    totalQuantity:cart.totalQuantity,
                    totalPrice:cart.totalPrice
                })
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