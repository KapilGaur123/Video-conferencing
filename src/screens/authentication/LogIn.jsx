import React, { useMemo, useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "../../store/slices/AuthSlice";
import { GoEye, GoEyeClosed } from "react-icons/go";
import "react-datepicker/dist/react-datepicker.css";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";

const LogIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const navigetor = useNavigate();
  const User = useSelector((state) => state.authSlice.User);
  const dispatch = useDispatch();

  const validation = () => {
    let newObj = {};

    if (!values.email) newObj.email = "Email is required!";
    if (!values.password) newObj.password = "Password is required!";

    return newObj;
  };

  const handleSubmit = async () => {
    try {
      const errors = validation();

      if (Object.keys(errors).length > 0) {
        setError(errors);
        return;
      }

      if (!User) {
        console.log("user not exist");
        return;
      }

      if (User.email === values.email && User.password === values.password) {
        dispatch(isLogin());
        navigetor("/welcome");
      } else {
        alert("Email not match or password");
        setValues({
          email: "",
          password: "",
        });
        return;
      }
    } catch (error) {
      console.log("error occured in login fuction", error);
    }
  };

  const handleChange = (e) => {
    setError({ ...error, [e.target.name]: "" });
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const inputFields = [
    {
      label: "Email Address",
      type: "email",
      name: "email",
      placeholder: "Email Address",
    },
    {
      label: "Enter Password",
      type: "password",
      name: "password",
      placeholder: "Enter Password",
      isPassword: true,
    },
  ];

  return (
    <div className="signup flex-comman">
      <div className="signup-container animate__animated animate__flipInY">
        <div className="logo-handler flex-comman">
          <div className="logo-container">
            <img src="../../public/webrtc.png" alt="" />
          </div>
        </div>
        <h2 className="text-center">Welcome Back!</h2>
        <p className="text-center">Continue where you left off.</p>
        <div className="input-container">
          {inputFields.map((field) => (
            <div className="input-fields" key={field.name}>
              <InputComponent
                label={field.label}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                isPassword={field.isPassword}
                value={values[field.name]}
                onChange={handleChange}
                error={error[field.name]}
              />
            </div>
          ))}
          <ButtonComponent
            type={"submit"}
            classNames={"get-start btn-bg-handle"}
            content={"Get Started"}
            onClick={handleSubmit}
          />
        </div>
        <p className="change-link">
          Create an Account?{" "}
          <Link to="/signup">
            <span>Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
