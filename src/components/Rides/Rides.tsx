import React, { useEffect, useState } from "react";

interface RidesProps {
  rides: any[];
}
const initialState: any = {};

export const Rides: React.FC<RidesProps> = ({ rides }) => {
  const [sortedRides, setSortedRides] = useState(initialState);
  useEffect(() => {
    const tempRides = rides.sort((a: any, b: any) => {
      if (a.passengers > b.passengers) return -1;
      if (a.passengers < b.passengers) return 1;
      return 0;
    });
    setSortedRides({ sortedRides: tempRides });
    console.log(rides);
  }, []);

  return (
    <div>
      <div>
        {!!sortedRides.sortedRides &&
          sortedRides.sortedRides.map((ride: any) => (
            <p
              key={
                ride.name.trim() + Math.floor(Math.random() * 1000).toString()
              }
            >
              {ride.passengers > 0
                ? `${ride.name} can take ${ride.passengers}`
                : `${ride.name} needs a ride`}
            </p>
          ))}
      </div>
    </div>
  );
};
