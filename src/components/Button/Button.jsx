import React from "react";
import s from "./Button.module.css";
const Button = ({
  details: { onClick, title, disabled, size, variant },
  my,
}) => {
  const sizes = {
    small: s.small,
    medium: s.medium,
    large: s.large,
  };
  const variants = {
    primary: s.primary,
    secondary: s.secondary,
  };

  return (
    <div
      style={{
        marginTop: my,
        marginBottom: my,
      }}
      className={s.buttonWrapper}
    >
      <button
        className={`${sizes[size]} ${variants[variant]}`}
        disabled={disabled}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

// default props
Button.defaultProps = {
  details: {
    onClick: () => {},
    title: "",
    disabled: false,
    size: "large",
    variant: "primary",
  },
  my: 10,
};

export default Button;
