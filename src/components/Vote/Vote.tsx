import {
  faHotdog,
  faStar,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Vote.css";

interface VoteProps {
  socket: any;
  vote: any;
}

export const Vote: React.FC<VoteProps> = ({ socket, vote }) => {
  return (
    <div className="vote-cont">
      <div className="vote__bar">
        <span>{vote.proposedPlace}</span>
        <button>
          <FontAwesomeIcon icon={faStar} />
        </button>
      </div>
    </div>
  );
};
