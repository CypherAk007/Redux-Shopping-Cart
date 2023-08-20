import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart-actions';
import { fetchCartData } from './store/cart-actions';
let isInitial = true;

function App() {
  const dispatch = useDispatch()
  const cartIsOpen = useSelector(state => state.ui.cartIsVisible)
  // make a put req to firebase
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state=>state.ui.notification)

  useEffect(()=>{
    dispatch(fetchCartData())
  },[dispatch])

  useEffect(() => {
    if (isInitial){
      isInitial=false 
      return
    }
    if (cart.changed){
      dispatch(sendCartData(cart)) 
    }
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
