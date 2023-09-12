import React, { useCallback, useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import { MealItem } from "./MealItem/MealItem";
import { Card } from "./../UI/Card";
import { useHttp } from "./../../hooks/use-http";

export const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const [error, isLoading, fetchData] = useHttp();

  useEffect(() => {
    const fetchMeals = (data) => {
      const items = [];
      for (let key in data) {
        items.push({ id: key, ...data[key] });
      }
      setMeals(items);
    };
    fetchData(fetchMeals, {
      url: "https://taskproject-aa787-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json",
    });
  }, [fetchData]);

  const content = meals.map((meal) => (
    <MealItem
      name={meal.name}
      key={meal.id}
      description={meal.description}
      price={meal.price}
      id={meal.id}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {isLoading && <p>Meals are loading...</p>}
          {!isLoading && error && <p>Something went wrong</p>}
          {!isLoading && !error && content}
        </ul>
      </Card>
    </section>
  );
};
