import React, { useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if(action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if(action.type === 'USER_PASSWORD'){
    return {value: action.value, isValid:action.value.trim().length > 6};
  }
  if(action.type === 'PASSWORD_BLUR'){
    return {value: state.value, isValid: state.value.trim().length > 6};
  }
  return {value: '', isValid: false};
}

const Login = (props) => {
//   const [enteredEmail, setEnteredEmail] = useState("");
//   const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollageName, setEnteredCollage] = useState("");
  const [collgeISValid, setCollageNameValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });
  // useEffect(
  //   () => {
  //     const identifier = setTimeout(() => {
  //       console.log("Checking form validity!");
  //       setFormIsValid(
  //         enteredPassword.trim().length > 6 &&
  //           enteredEmail.includes("@") &&
  //           enteredCollageName.trim().length > 2
  //       );
  //     }, 500);

  //     return () => {
  //       console.log("CleanUp");
  //       clearTimeout(identifier);
  //     };
  //   }, // [setFormIsValid, enteredPassword, enteredEmail] );
  //   [enteredPassword, enteredEmail, enteredCollageName]
  // );

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
      passwordState.isValid &&
        event.target.value.includes("@") &&
        enteredCollageName.trim().length > 2
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword( {type:'USER_PASSWORD', value: event.target.value});

    setFormIsValid(
      event.target.value.trim().length > 6 &&
      emailState.isValid &&
        enteredCollageName.trim().length > 2
    );
  };

  const collageChangeHandler = (event) => {
    setEnteredCollage(event.target.value);

    setFormIsValid(
      passwordState.isValid &&
      emailState.isValid &&
        event.target.value.trim().length > 2
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'PASSWORD_BLUR'});
  };

  const validateCollageHandler = () => {
    setCollageNameValid(enteredCollageName.trim().length > 2);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, enteredCollageName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
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
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
