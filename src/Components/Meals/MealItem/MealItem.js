import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import { MealItemForm } from "./MealItemForm";
import CartContext from "../../../store/cart-context";
export const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    const item = {
      amount: amount,
      price: props.price,
      name: props.name,
      id: props.id,
    };
    cartCtx.addItem(item);
  };
  return (
    <li className={classes.meal} key={props.id}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>

      <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
    </li>
  );
};
