import React from "react";


const ButtonComponent = ({type, content, classNames, onClick}) => {
  return (
    <button onClick={onClick} type={type} className={classNames}>
      {content}
    </button>
  );
};

export default ButtonComponent;