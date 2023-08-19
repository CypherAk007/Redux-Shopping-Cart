import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice'
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {
  const dispatch = useDispatch()

  const cartHandler = ()=>{
    dispatch(uiActions.toggle())
  }

  const cartQuantity = useSelector(state=>state.cart.totalQuantity)

  return (
    <button onClick={cartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
