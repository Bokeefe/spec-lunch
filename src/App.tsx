import { UserForm } from "./components/UserForm/UserForm";
import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { Chat } from "./components/Chat/Chat";
import { Lunch } from "./components/Lunch/Lunch";
import "./App.css";
import { CountDown } from "./components/CountDown/CountDown";

const ENDPOINT = "http://127.0.0.1:8080";

function App() {
  const [socket, setSocket] = useState(
    window.location.href.startsWith("http://localhost") ? io(ENDPOINT) : io()
  );
  const [lunchUser, setLunchUser] = useState({ name: "" });

  useEffect(() => {
    socket.on("connection", () => {
      console.log("connected");
    });
  }, []);

  const handleUserForm = (form: any) => {
    setLunchUser(form);
  };

  return (
    <div className="App">
      <main>
        {<CountDown socket={socket} />}
        {!lunchUser.name && <UserForm onSubmit={handleUserForm} />}
        {lunchUser.name && <Lunch socket={socket} lunchUser={lunchUser} />}
        {lunchUser.name && <Chat socket={socket} name={lunchUser.name} />}
      </main>
    </div>
  );
}

export default App;
