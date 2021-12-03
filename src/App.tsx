import { UserForm } from "./components/UserForm/UserForm";
import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Chat } from "./components/Chat/Chat";
import { Lunch } from "./components/Lunch/Lunch";

const ENDPOINT = "http://127.0.0.1:1917";

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
    console.log(form);
    setLunchUser(form);
  };

  return (
    <div className="App">
      <main>
        {!lunchUser.name && <UserForm onSubmit={handleUserForm} />}
        {lunchUser.name && <Lunch socket={socket} lunchUser={lunchUser} />}
        {lunchUser.name && <Chat socket={socket} name={lunchUser.name} />}
      </main>
    </div>
  );
}

export default App;
