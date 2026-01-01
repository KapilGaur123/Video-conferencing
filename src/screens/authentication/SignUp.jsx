import React, { useState } from "react";
import "animate.css";
import "./Auth.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isSignup } from "../../store/slices/AuthSlice";
import { useDispatch } from "react-redux";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";

const SignUp = () => {
  const [value, setValue] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [show, setShow] = useState(false);

  const navigator = useNavigate();
  const dispatch = useDispatch();

  const validation = () => {
    let newObj = {};

    if (!value.email) newObj.email = "Email is required!";
    if (!value.name) newObj.name = "Name is required!";
    if (!value.phone) newObj.phone = "Phone is required!";
    if (!value.password) newObj.password = "Password is required!";

    return newObj;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const errObj = validation();

      if (Object.keys(errObj).length > 0) {
        setError(errObj);
        return;
      }

      dispatch(isSignup({ status: true, user: value }));
      navigator("/");

      setValue({
        email: "",
        name: "",
        phone: "",
        password: "",
      });
    } catch (error) {
      console.log("error occured in handleSubmit fuction", error);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setError({ ...error, [e.target.name]: "" });
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleShow = () => {
    setShow(!show);
  };

  const inputFields = [
    {
      label: "Email Address",
      type: "email",
      name: "email",
      placeholder: "Email Address",
    },
    {
      label: "Company Name",
      type: "text",
      name: "name",
      placeholder: "Enter Company Name",
    },
    {
      label: "Phone Number",
      type: "number",
      name: "phone",
      placeholder: "Enter Phone Number",
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
    <div className={`signup flex-comman`}>
      <form
        onSubmit={handleSubmit}
        className="signup-container animate__animated animate__flipInY"
      >
        <div className="logo-handler flex-comman">
          <div className="logo-container">
            <img src="../../public/webrtc.png" alt="" />
          </div>
        </div>
        <h2 className="text-center">Create an Account</h2>
        <p className="text-center">Create your account in seconds.</p>
        <div className="input-container">
          {inputFields.map((field) => (
            <div className="input-fields" key={field.name}>
              <InputComponent
                style={{ marginBottom: error[field.name] ? "0px" : "12px" }}
                label={field.label}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={value[field.name]}
                onChange={handleChange}
                error={error[field.name]}
                isPassword={field.isPassword}
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
          Already have an account?{" "}
          <Link to="/login">
            <span>Log In</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
