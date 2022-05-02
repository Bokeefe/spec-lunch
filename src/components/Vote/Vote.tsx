import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import "./Vote.css";

interface VoteProps {
  socket: any;
  vote: any;
  lunchUser: any;
}

export const Vote: React.FC<VoteProps> = ({ socket, vote, lunchUser }) => {
  const handleVote = (
    proposedPlace: DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  ) => {
    socket.emit("vote", { vote: proposedPlace, name: lunchUser.name });
  };

  return (
    <div className="vote container">
      <div className="vote__bar">
        <span>{vote.proposedPlace}</span>
        <button
          className="vote-btn btn btn-primary"
          onClick={() => handleVote(vote.proposedPlace)}
        >
          {vote.votes !== 0 ? vote.votes : <FontAwesomeIcon icon={faStar} />}
        </button>
      </div>
    </div>
  );
};
