import React, { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  if (action.type === "ADD__ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    let updatedItems = state.items.concat(action.item);
    if (existingCartItemIndex >= 0) {
      const newState = [...state.items];
      newState[existingCartItemIndex].amount += action.item.amount;
      updatedItems = [...newState];
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE__ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount > 1) {
      updatedItems = state.items.map((item) =>
        item.id === action.id ? { ...item, amount: --item.amount } : item
      );
    } else {
      updatedItems = [...state.items];
      updatedItems.splice(existingCartItemIndex, 1);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "EMPTY__CART") {
    return {
      items: [],
      totalAmount: 0,
    };
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
  const emptyCart = () => {
    cartDispatcher({ type: "EMPTY__CART" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCart,
    emptyCart: emptyCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
