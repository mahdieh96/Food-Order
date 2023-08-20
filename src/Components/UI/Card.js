import React from "react";
import classes from "./Card.module.css";
export const Card = (props) => {
  const className = `${classes.card} ${props.className}`;
  return <div className={className}>{props.children}</div>;
};
