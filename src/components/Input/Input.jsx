import React from "react";
import s from "./Input.module.css";
export const Input = ({
  details: { label, placeholder, type, name, value, onChange, onEnterHandler },
}) => {
  return (
    <div className={s.InputWrapper}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
        placeholder={placeholder}
        onKeyUp={onEnterHandler}
      />
    </div>
  );
};

Input.defaultProps = {
  details: {
    onEnterHandler: () => {},
  },
};
