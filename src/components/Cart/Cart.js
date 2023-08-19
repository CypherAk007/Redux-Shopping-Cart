import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';


const Cart = (props) => {

  const cartItems = [{ title: 'Test Item', quantity: 3, total: 18, price: 6 }]
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {/* <CartItem
          item={cartItems.map(function(item){
            return {
              title: item.title,
              quantity: item.quantity,
              total: item.total,
              price: item.price
            }
          }
          )
          }
        /> */}
        <CartItem item={cartItems[0]}/>
      </ul>
    </Card>
  );
};

export default Cart;
