import React from "react";
import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import { Input } from "../../../components/Input/Input";

import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const bottomStyleWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  margin: "0",
};
const bottomStyleHelper = {
  margin: "0",
  padding: "0",
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "var(--white)",
};
const bottomStyleMainHelper = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "var(--primary)",
  margin: ".7rem 0",
  cursor: "pointer",
};

const cardHeader = {
  title: "browserit!",
  subtitle: "Realtime code synchorinization",
};

const NewRoom = ({ setCurrentStep }) => {
  const [roomDetails, setroomDetails] = React.useState({
    email: "",
    roomId: "",
    disabled: true,
  });
  const navigate = useNavigate();

  const createNewRoom = () => {
    if (!roomDetails.email) {
      toast.error("Enter an email address");
      return;
    }

    const roomId = uuidv4();
    setroomDetails({
      ...roomDetails,
      roomId: roomId,
      disabled: true,
    });

    navigate(`/editor/${roomId}`, {
      state: {
        email: roomDetails.email,
        roomId: roomId,
      },
    });
    toast.success("New room created");
  };

  const buttonDetails = {
    onClick: createNewRoom,
    title: "Start a new room",
    disabled: roomDetails.disabled,
    size: "large",
    variant: "primary",
  };

  const inputDetails = {
    label: "Email address",
    placeholder: "What's your email address?",
    type: "email",
    name: "email",
    value: roomDetails.email,
    onChange: (e) => {
      setroomDetails({
        ...roomDetails,
        email: e.target.value,
        disabled: false,
      });
    },
    onEnterHandler: (e) => {
      if (e.key === "Enter") {
        createNewRoom();
      }
    },
  };

  return (
    <Card header={cardHeader}>
      <Input details={inputDetails} />
      <Button details={buttonDetails} />
      <div style={bottomStyleWrapper}>
        <p style={bottomStyleHelper}>OR</p>
        <h4
          onClick={() => {
            setCurrentStep(1);
          }}
          style={bottomStyleMainHelper}
        >
          Join a room
        </h4>
      </div>
    </Card>
  );
};

export default NewRoom;
