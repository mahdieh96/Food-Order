import React from "react";
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
export const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <button>click</button>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="a table full of delicious food!" />
      </div>
    </>
  );
};
