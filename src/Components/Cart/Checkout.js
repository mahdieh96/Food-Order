import React, { useRef, useState } from "react";
import { Input } from "../UI/Input";
import classes from "./Checkout.module.css";
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;
export const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    city: true,
    street: true,
    postal: true,
  });
  const nameRef = useRef();
  const cityRef = useRef();
  const postalRef = useRef();
  const streetRef = useRef();
  const confirmHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const city = cityRef.current.value;
    const postal = postalRef.current.value;
    const street = streetRef.current.value;

    const nameIsValid = !isEmpty(name);
    const cityIsValid = !isEmpty(city);
    const streetIsValid = !isEmpty(street);
    const postalIsValid = isFiveChars(postal);

    setFormInputsValidity({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postal: postalIsValid,
    });
    const formIsValid =
      nameIsValid && cityIsValid && streetIsValid && postalIsValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmitOrder({
      name: name,
      city: city,
      postalCode: postal,
      street: street,
    });
  };
  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      <div className={classes["user-data"]}>
        <Input
          ref={nameRef}
          className={`${classes["user-input"]} ${
            !formInputsValidity.name && classes.invalid
          }`}
          label="Your Name"
          input={{
            type: "text",
            id: "name",
          }}
        />
        {!formInputsValidity.name && <p>Please enter a valid name.</p>}
        <Input
          ref={streetRef}
          className={`${classes["user-input"]} ${
            !formInputsValidity.street && classes.invalid
          }`}
          label="Street"
          input={{
            type: "text",
            id: "street",
          }}
        />
        {!formInputsValidity.street && <p>Please enter a valid street.</p>}
        <Input
          ref={postalRef}
          className={`${classes["user-input"]} ${
            !formInputsValidity.postal && classes.invalid
          }`}
          label="Postal Code"
          input={{
            id: "postal-code",
            type: "text",
          }}
        />
        {!formInputsValidity.postal && <p>Please enter a valid postal code.</p>}
        <Input
          ref={cityRef}
          className={`${classes["user-input"]} ${
            !formInputsValidity.city && classes.invalid
          }`}
          label="City"
          input={{
            id: "city",
            type: "text",
          }}
        />
        {!formInputsValidity.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={props.onClose}
          type="button"
        >
          Cancel
        </button>
        <button type="submit" className={classes.button}>
          Confirm
        </button>
      </div>
    </form>
  );
};
