import React, { useEffect, useState } from "react";
import { Rides } from "../Rides/Rides";
import { Vote } from "../Vote/Vote";
import "./Lunch.css";

interface LunchProps {
  socket: any;
  lunchUser: any;
}

export const Lunch: React.FC<LunchProps> = ({ socket, lunchUser }) => {
  const [lunches, setLunch] = useState([]);

  useEffect(() => {
    socket.emit("getLunch", lunchUser);
    socket.on("lunchRes", (lunches: any) => {
      setLunch(lunches);
    });
  }, []);

  return (
    <div className="lunch-cont">
      <br />
      <strong>Lunch Ideas:</strong>
      {lunches
        .filter((lunch: any) => lunch.proposedPlace.length)
        .map((lunch) => (
          <>
            <Vote
              socket={socket}
              vote={lunch}
              key={Math.random().toString()}
              lunchUser={lunchUser}
            />
          </>
        ))}
      {lunches.length && <Rides rides={lunches} />}
    </div>
  );
};
