import React, { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  if (action.type === "ADD__ITEM") {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE__ITEM") {
    return state;
  }
  return state;
};

export const CartProvider = (props) => {
  const [cartState, cartDispatcher] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });
  const addItemToCartHandler = (item) => {
    cartDispatcher({ type: "ADD__ITEM", item: item });
  };
  const removeItemFromCart = (id) => {
    cartDispatcher({ type: "REMOVE__ITEM", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
