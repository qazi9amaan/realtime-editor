import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Button from "../../components/Button/Button";
import Client from "../../components/Client/Client";
import { Editor } from "../../components/Editor/Editor";
import s from "./Editorpage.module.css";
import ACTIONS from "../../Actions";
import { initSocket } from "../../socket";

const Editorpage = () => {
  const location = useLocation();
  const [userState, setuserState] = useState(location.state);

  const { roomId, email } = userState;

  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: email,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== email) {
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }
          console.log(clients);
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  const leavebuttonDetails = {
    onClick: () => {
      reactNavigator("/");
    },
    title: "Leave room",
    disabled: false,
    size: "small",
    variant: "primary",
  };

  const copyButtonDetails = {
    onClick: async () => {
      try {
        await navigator.clipboard.writeText(roomId);
        toast.success("Room code has been copied to your clipboard");
      } catch (err) {
        toast.error("Could not copy the room code");
        console.error(err);
      }
    },
    title: "Copy room code",
    disabled: false,
    size: "small",
    variant: "secondary",
  };

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className={s.mainWrapper}>
      <aside className={s.asideWrapper}>
        <div className={s.asideMainContent}>
          <div className={s.cardHeader}>
            <h3>browserit</h3>
            <p>Realtime code synchorinization</p>
          </div>
          <div className={s.ClientsWrapper}>
            <h3 className={s.clientHeader}>Connected users</h3>
            {/* clients */}
            {clients.map((client) => (
              <Client key={client.socketId} emailAddress={client.username} />
            ))}
          </div>
        </div>
        <div className={s.asideFooter}>
          <Button my={9} details={copyButtonDetails} />
          <Button details={leavebuttonDetails} />
        </div>
      </aside>
      <main className={s.editorWrapper}>
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </main>
    </div>
  );
};

export default Editorpage;
