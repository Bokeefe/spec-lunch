import {
  faHotdog,
  faStar,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useEffect,
  useState,
} from "react";
import "./Vote.css";

interface VoteProps {
  socket: any;
  vote: any;
  lunchUser: any;
}
// const initialState ={ [key: string]: number }

export const Vote: React.FC<VoteProps> = ({ socket, vote, lunchUser }) => {
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    socket.on("newVotes", (votes: any) => {
      handleNewVotes(votes);
    });
  });

  const handleVote = (
    proposedPlace: DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  ) => {
    socket.emit("vote", { vote: proposedPlace, name: lunchUser.name });
  };

  const handleNewVotes = (incomingVotes: any) => {
    if (incomingVotes[vote.proposedPlace] !== undefined) {
      setVotes(incomingVotes[vote.proposedPlace]);
    }
  };

  return (
    <div className="vote container">
      <div className="vote__bar">
        <span>{vote.proposedPlace}</span>
        <button
          className="vote-btn"
          onClick={() => handleVote(vote.proposedPlace)}
        >
          {votes !== 0 ? votes : <FontAwesomeIcon icon={faStar} />}
        </button>
      </div>
    </div>
  );
};
