import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import { Modal } from "./../UI/Modal";
import CartContext from "./../../store/cart-context";
import { CartItem } from "./CartItem";
import { Checkout } from "./Checkout";
export const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const orderHandler = () => {
    setShowCheckout(true);
  };

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          price={item.price}
          amount={item.amount}
          name={item.name}
          key={props.id}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        close
      </button>
      {cartCtx.items.length > 0 && (
        <button className={classes.button} onClick={orderHandler}>
          order
        </button>
      )}
    </div>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!showCheckout && modalActions}
      {showCheckout && <Checkout onClose={props.onClose} />}
    </Modal>
  );
};
