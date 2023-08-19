import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {  useSelector } from 'react-redux';


function App() {

  const cartIsOpen =useSelector(state=>state.ui.cartIsVisible)
  // make a put req to firebase
  const cart = useSelector(state => state.cart)

  useEffect(()=>{
    const sendCartData = async ()=>{}
    fetch('https://react-http-2956c-default-rtdb.firebaseio.com/cart.json' , {
      method:'PUT',
      body:JSON.stringify(cart)
    })
  },[cart])

  return (
    <Layout>
      {cartIsOpen && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
