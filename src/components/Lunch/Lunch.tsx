import React, { useEffect, useState } from "react";
import { Vote } from "../Vote/Vote";
import "./Lunch.scss";

interface LunchProps {
  socket: any;
  lunchUser: any;
}

export const Lunch: React.FC<LunchProps> = ({ socket, lunchUser }) => {
  const [lunches, setLunch] = useState([]);

  useEffect(() => {
    socket.emit("getLunch", lunchUser);
    socket.on("lunchRes", (lunches: any) => {
      console.log(lunches);
      setLunch(lunches);
    });
  }, []);

  return (
    <div className="lunch-cont">
      <strong>Lunch Ideas:</strong>
      {lunches
        .filter((lunch: any) => lunch.proposedPlace.length)
        .map((lunch) => (
          <Vote socket={socket} vote={lunch} />
        ))}
    </div>
  );
};
