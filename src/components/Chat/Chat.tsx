import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { LegacyRef, useEffect, useState } from "react";
import "./Chat.scss";

interface ChatProps {
  socket: any;
  name: string;
}

export const Chat: React.FC<ChatProps> = ({ socket, name }) => {
  const initialState = {
    chatToggle: false,
    message: "",
    messages: [{ name: "sys", message: "nothing here yet" }],
  };
  const [state, setState] = useState(initialState);
  const messageRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("newMessage", (message: any) => {
      setState((prevState) => {
        const messages = prevState.messages.concat(message);
        return { ...prevState, messages };
      });
      scrollToBottom();
    });
  }, []);

  const handleChatToggle = () => {
    setState((prevState) => ({
      ...prevState,
      chatToggle: !prevState.chatToggle,
    }));
  };

  const handleChatMessage = (e: any) => {
    const newMessage = e.target.value;
    if (e.keyCode !== 13) {
      setState({ ...state, message: newMessage });
    } else {
      socket.emit("sendMessage", { name, message: newMessage });
      e.target.value = "";
    }
  };

  const scrollToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };

  return (
    <div className="chat-cont">
      <div
        className={"chat__icon " + (state.chatToggle ? "active" : "")}
        onClick={handleChatToggle}
      >
        <FontAwesomeIcon icon={faComments} />
      </div>
      {state.chatToggle && (
        <div>
          <div className="chat__convo" ref={messageRef}>
            {state.messages.map(
              (message: { name: string; message: string }) => {
                return (
                  <div
                    key={(Math.random() * 1000).toString()}
                    className="message"
                  >
                    <span>
                      <strong>{message.name}</strong>: {message.message}
                    </span>
                  </div>
                );
              }
            )}
          </div>
          <div className="chat__input">
            <input type="text" onKeyUp={handleChatMessage} />
          </div>
        </div>
      )}
    </div>
  );
};
