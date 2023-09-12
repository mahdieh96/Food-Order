import React, { forwardRef } from "react";
import classes from "./Input.module.css";
export const Input = forwardRef((props, ref) => {
  console.log(props.className);
  return (
    <div className={`${classes.input} ${props.className || ""} `}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} ref={ref} />
    </div>
  );
});
