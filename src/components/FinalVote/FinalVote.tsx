import React, { useEffect } from "react";
interface FinalVoteProps {
  finalVote: any;
}
export const FinalVote: React.FC<FinalVoteProps> = ({ finalVote }) => {
  useEffect(() => {}, []);
  return (
    <>
      {
        <div>
          <b>Voting ended:</b>
          <ol>
            {finalVote.map((vote: any) => (
              <li>
                {vote.proposedPlace} {vote.votes} votes
              </li>
            ))}
          </ol>
        </div>
      }
    </>
  );
};
