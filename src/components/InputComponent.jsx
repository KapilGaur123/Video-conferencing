import React, { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import "../screens/authentication/Auth.css";

const InputComponent = ({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  error,
  isPassword = false,
}) => {
  const [show, setShow] = useState(false);

  const inputType = isPassword? (show? "text": "password") : type;
  
  document.querySelectorAll("input[type='number']").forEach(input=> {
    input.addEventListener("wheel", (e)=> {
      e.preventDefault();
    })
    input.addEventListener("keydown",(e)=>{
      if(e.target.value === 'e'){
        return;
      }
    })
  })

  return (
    <>
      <p>{label}</p>
      {/* <div> */}
        <div style={{maxHeight: "38px"}} className={`${isPassword ? "password-field-handler" : ""}`}>
          <input
            type={inputType}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoComplete="off"
          />
          {isPassword && (
            <span onClick={()=> setShow(!show)}>{show? <GoEyeClosed/>: <GoEye/>}</span>
          )}
        </div>
      {/* </div> */}
      {error && <span className="error-msg">{error}</span>}
    </>
  );
};

export default InputComponent;
