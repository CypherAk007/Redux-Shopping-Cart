import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch()
  const cartIsOpen = useSelector(state => state.ui.cartIsVisible)
  // make a put req to firebase
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state=>state.ui.notification)

  useEffect(() => {

    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'sending...',
        message: 'sen ding cart data!'

      }))
      const response = await fetch('https://react-http-2956c-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      })

      if (!response.ok) {
        // dispatch(uiActions.showNotification({
        //   status: 'error',
        //   title: 'Error...',
        //   message: 'sending cart data Failed!'

        // }))
        throw new Error('sending cart data failed')
      }
      // const responseData = await response.json();
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'success...',
        message: 'sent cart data!'

      }))
    }
    if (isInitial){
      isInitial=false 
      return
    }
    sendCartData().catch((error) => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error...',
        message: 'sending cart data Failed!'
      }))
    })

  }, [cart,dispatch])

  return (
    <>
    {notification && <Notification satus={notification.status} title={notification.title} message={notification.message}></Notification>}
    <Layout>
      {cartIsOpen && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
