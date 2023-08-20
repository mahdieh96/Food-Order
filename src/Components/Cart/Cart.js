import React from "react";
import classes from "./Cart.module.css";
export const Cart = () => {
  const cartItem = (
    <ul className={classes["cart-items"]}>
      {[
        { id: "c1", name: "Sushi", amount: 2, price: 12.99 },
        { id: "c1", name: "Sushi", amount: 2, price: 12.99 },
      ].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <div>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>$88.99</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]}>close</button>
        <button className={classes.button}>order</button>
      </div>
    </div>
  );
};
