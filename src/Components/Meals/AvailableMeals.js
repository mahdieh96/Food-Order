import React, { useCallback, useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import { MealItem } from "./MealItem/MealItem";
import { Card } from "./../UI/Card";

export const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMeals = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetch(
        "https://taskproject-aa787-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) throw new Error("sth went wrong");

      const data = await response.json();
      const items = [];
      for (let key in data) {
        items.push({ id: key, ...data[key] });
      }
      setMeals(items);
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

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
