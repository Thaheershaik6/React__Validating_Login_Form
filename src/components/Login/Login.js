import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollageName, setEnteredCollage] = useState("");
  const [collgeISValid, setCollageNameValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(
    () => {
      const identifier = setTimeout(() => {
        console.log("Checking form validity!");
        setFormIsValid(
          enteredPassword.trim().length > 6 &&
            enteredEmail.includes("@") &&
            enteredCollageName.trim().length > 2
        );
      }, 500);

      return () => {
        console.log("CleanUp");
        clearTimeout(identifier);
      };
    }, // [setFormIsValid, enteredPassword, enteredEmail] );
    [enteredPassword, enteredEmail, enteredCollageName]
  );

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const collageChangeHandler = (event) => {
    setEnteredCollage(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateCollageHandler = () => {
    setCollageNameValid(enteredCollageName.trim().length > 2);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collgeISValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="collageName">Collage name</label>
          <input
            type="text"
            id="collageName"
            value={enteredCollageName}
            onChange={collageChangeHandler}
            onBlur={validateCollageHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
