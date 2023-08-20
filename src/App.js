import React, { useState } from "react";
import { Header } from "./Components/Layout/Header";
import { Meals } from "./Components/Meals/Meals";
import { Cart } from "./Components/Cart/Cart";
function App() {
  const [cartIsShow, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <>
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
      {cartIsShow && <Cart onClose={hideCartHandler} />}
    </>
  );
}

export default App;
