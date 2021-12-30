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
  const [votes, setVotes] = useState(Object);

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

  const handleNewVotes = (votes: any) => {
    let newVotes: any = {};
    for (const vote in votes) {
      if (newVotes[votes.vote]) {
        newVotes[votes[vote]]++;
      } else {
        newVotes[votes[vote]] = 1;
      }
      setVotes(newVotes);
    }
  };

  return (
    <div className="vote container">
      <div className="vote__bar">
        <span>{vote.proposedPlace}</span>
        <button onClick={() => handleVote(vote.proposedPlace)}>
          {
            (vote.proposedPlace,
            votes[vote.proposedPlace] ? (
              votes[vote.proposedPlace]
            ) : (
              <FontAwesomeIcon icon={faStar} />
            ))
          }
        </button>
      </div>
    </div>
  );
};
