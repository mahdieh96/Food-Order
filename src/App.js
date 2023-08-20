import React from "react";
import { Header } from "./Components/Layout/Header";
import { Meals } from "./Components/Meals/Meals";
import { Cart } from "./Components/Cart/Cart";
function App() {
  return (
    <>
      <Header />
      <main>
        <Meals />
      </main>
      <Cart />
    </>
  );
}

export default App;
