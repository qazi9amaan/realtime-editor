import React from "react";
import Avatar from "react-avatar";
import s from "./Client.module.css";
const Client = ({ emailAddress }) => {
  return (
    <div className={s.client}>
      <div className={s.clientAvatar}>
        <Avatar size={35} round={50} name={emailAddress} />
      </div>
      <div className={s.clientName}>
        <p>
          <span>{emailAddress.split("@")[0]}</span>
          <span>{emailAddress}</span>
        </p>
      </div>
    </div>
  );
};

export default Client;
