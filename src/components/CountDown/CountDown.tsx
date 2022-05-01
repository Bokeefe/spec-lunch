import React, { useEffect, useState } from "react";
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

  return <div>count down: {count}</div>;
};
