import React, { useEffect, useState } from "react";
import "./CountDown.css";
interface CountDownProps {
  socket: any;
}
export const CountDown: React.FC<CountDownProps> = ({ socket }) => {
  const [count, setCount] = useState([]);

  useEffect(() => {
    socket.on("countDown", (count: any) => {
      setCount(count);
    });
  }, [socket]);

  return <div className="count-down">count down: {count}</div>;
};
