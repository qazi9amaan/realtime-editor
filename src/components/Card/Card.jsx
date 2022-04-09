import React from "react";
import Button from "../Button/Button";
import { Input } from "../Input/Input";
import s from "./Card.module.css";

const Card = ({ children, header: { title, subtitle } }) => {
  return (
    <div className={s.card}>
      <div className={s.cardHeader}>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Card;
