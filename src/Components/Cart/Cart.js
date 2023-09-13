import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import { Modal } from "./../UI/Modal";
import CartContext from "./../../store/cart-context";
import { CartItem } from "./CartItem";
import { Checkout } from "./Checkout";
import { useHttp } from "./../../hooks/use-http";
export const Cart = (props) => {
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [error, isLoading, fetchData] = useHttp();
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

  const submitOrderHandler = (userData) => {
    cartCtx.emptyCart();
    setIsSubmittingOrder(true);
    const data = { userData: userData, cartItems: cartCtx.items };
    fetchData(() => {}, {
      url: "https://taskproject-aa787-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      method: "POST",
      body: data,
      headers: { CONTENT_TYPE: "application/json" },
    });
  };

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
  const cartModalContent = (
    <>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!showCheckout && modalActions}
      {showCheckout && (
        <Checkout onClose={props.onClose} onSubmitOrder={submitOrderHandler} />
      )}
    </>
  );

  const isSubmittingCartModalContent = (
    <>
      {isLoading && <p>Your order is Submitting...</p>}
      {!isLoading && error && (
        <>
          <p>{error}</p>
          <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>
              close
            </button>
          </div>
        </>
      )}
      {!isLoading && !error && (
        <>
          <p>Your order successfully submitted.</p>
          <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>
              close
            </button>
          </div>
        </>
      )}
    </>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmittingOrder && cartModalContent}
      {isSubmittingOrder && isSubmittingCartModalContent}
    </Modal>
  );
};
