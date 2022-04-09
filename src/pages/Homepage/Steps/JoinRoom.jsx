import React from "react";
import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import { Input } from "../../../components/Input/Input";
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

const JoinRoom = ({ setCurrentStep }) => {
  const [roomDetails, setroomDetails] = React.useState({
    email: "",
    roomId: "",
    disabled: true,
  });
  const navigate = useNavigate();

  const joinRoom = () => {
    if (!roomDetails.roomId) {
      toast.error("Please enter a room code");
      return;
    }
    const emailAddress = prompt("Enter your email address");

    if (!emailAddress || !emailAddress.includes("@")) {
      toast.error("Enter a valid email address");
      return;
    }

    setroomDetails({
      ...roomDetails,
      email: emailAddress,
      disabled: true,
    });

    // TODO:check if room exists

    navigate(`/editor/${roomDetails.roomId}`, {
      state: {
        email: emailAddress,
        roomId: roomDetails.roomId,
      },
    });
  };

  const buttonDetails = {
    onClick: joinRoom,
    title: "Join existing room",
    disabled: roomDetails.disabled,
    size: "large",
    variant: "primary",
  };

  const inputDetails = {
    label: "Room code",
    placeholder: "What's the room code?",
    type: "text",
    name: "roomcode",
    value: roomDetails.roomId,
    onChange: (e) => {
      setroomDetails({
        ...roomDetails,
        roomId: e.target.value,
        disabled: false,
      });
    },
    onEnterHandler: (e) => {
      if (e.key === "Enter") {
        joinRoom();
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
            setCurrentStep(0);
          }}
          style={bottomStyleMainHelper}
        >
          Create a room
        </h4>
      </div>
    </Card>
  );
};

export default JoinRoom;
