import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHotdog } from "@fortawesome/free-solid-svg-icons";
import React, { FormEvent, useEffect, useState } from "react";
import "./UserForm.css";
import { punishments } from "./punishments";
interface UserFormProps {
  onSubmit: Function;
}

export const UserForm: React.FC<UserFormProps> = (props) => {
  const initialState = {
    name: "",
    passengers: "",
    proposedPlace: "",
    returnTime: "8",
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const name = localStorage.getItem("name");
    setState({ ...state, name: name ? name : "" });
    console.log();
  }, [props]);

  const handleNameChange = (event: any) => {
    const problemChildren = ["dan", "notdan", "zapfel", "daniel", "brandon"];
    const isProblemChild = problemChildren.includes(
      event.target.value.toLowerCase()
    );
    if (isProblemChild) {
      alert(
        `${event.target.value}: You have been flagged as a problematc user of this application.\n Please attempt to behave while using this application.`
      );
    }
    localStorage.setItem("name", event.target.value);
    setState({ ...state, name: event.target.value });
  };

  const handlePassengerChange = (passengers: string) => {
    setState({ ...state, passengers });
  };

  const handleReturnTimeChange = (returnTime: string) => {
    setState({ ...state, returnTime });
  };

  const handleProposedPlaceChange = (proposedPlace: string) => {
    const placeBalcklist = [
      "butts",
      "rump",
      "butt",
      "rumps",
      "ass",
      "@$$",
      "twin peaks",
    ];
    const beenThereDoneThat = placeBalcklist.includes(
      proposedPlace.toLowerCase()
    );
    if (beenThereDoneThat) {
      window.confirm(
        `${proposedPlace} is not a viable place for lunch. \n ${
          punishments[Math.floor(Math.random() * punishments.length + 0)]
        }`
      );

      window.location.href = "/";
    }
    setState({ ...state, proposedPlace });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(state);
  };

  return (
    <>
      <div className="user-form">
        <form onSubmit={handleSubmit}>
          <div className="field-cont container">
            <h1>So you wanna get lunch {state.name}?</h1>
            <input
              type="text"
              placeholder="Your Name"
              value={state.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="field-cont container">
            <label htmlFor="passengers">
              How many people can fit in your car?
            </label>
            <select
              name="passengers"
              id="passengers"
              onChange={(e) => handlePassengerChange(e.target.value)}
            >
              <option value="0">I need a ride</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <div className="field-cont container">
            <label htmlFor="place">
              Do you have a place in mind? (optional)
            </label>
            <input
              type="text"
              id="place"
              placeholder="ex: Jabos"
              onBlur={(e) => handleProposedPlaceChange(e.target.value)}
            />
          </div>
          <div className="field-cont container">
            <label htmlFor="meeting">Need to be back by:</label>
            <select
              name="meeting"
              id="meeting"
              onChange={(e) => handleReturnTimeChange(e.target.value)}
            >
              <option value="8">Never!</option>
              <option value="1">12:30</option>
              <option value="2">12:45</option>
              <option value="3">1:00</option>
              <option value="4">1:15</option>
              <option value="5">1:30</option>
              <option value="6">1:45</option>
              <option value="7">2:00</option>
            </select>
          </div>
          <div className="field-cont container">
            <button type="submit" className="btn btn-light">
              <FontAwesomeIcon icon={faHotdog} />
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
