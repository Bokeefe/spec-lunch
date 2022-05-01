import React, { useEffect, useState } from "react";
import { ReturnTime } from "../../shared/return-time.enum";
import { Rides } from "../Rides/Rides";
import { Vote } from "../Vote/Vote";
import "./Lunch.css";

interface LunchProps {
  socket: any;
  lunchUser: any;
}

export const Lunch: React.FC<LunchProps> = ({ socket, lunchUser }) => {
  const [lunches, setLunch] = useState([]);
  const [returnTime, setReturnTime] = useState("");

  useEffect(() => {
    socket.emit("getLunch", lunchUser);
    socket.on("lunchRes", (lunches: any) => {
      setLunch(lunches);
      let newReturnTime = lunches.map((lunch: any) =>
        parseInt(lunch.returnTime)
      );
      setReturnTime(ReturnTime[Math.min(...newReturnTime)]);
    });
  }, [socket, lunchUser]);

  return (
    <div className="lunch-cont">
      <p>
        Need to be back by: <strong>{returnTime}</strong>
      </p>
      <strong>Lunch Ideas:</strong>
      {lunches
        .sort((a: any, b: any) =>
          a.proposedPlace.localeCompare(b.proposedPlace)
        )
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
