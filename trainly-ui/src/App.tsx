import { useEffect, useState } from "react";
import Trains from "./Trains";

const App = () => {
  const [trains, setTrains] = useState([]);
  const [show, setShow] = useState(false);
  const [trainNumber, setTrainNumber] = useState("");
  const [trainDetails, setTrainDetails] = useState(null);

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/");
      const data = await response.json();
      setTrains(data);
    } catch (error) {
      console.log("Error fetching trains:", error);
    }
  };

  const handleClick = (trainNumber: string) => {
    setShow(true);
    setTrainNumber(trainNumber);
    fetchTrainDetails(trainNumber);
  };

  const fetchTrainDetails = async (trainNumber: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/${trainNumber}`);
      const data = await response.json();
      setTrainDetails(data);
    } catch (error) {
      console.log("Error fetching train details:", error);
    }
  };

  return (
    <>
      {!show && (
        <div>
          <h1>Trainly</h1>
          <ul className="list-group">
            {trains.map((train: any) => (
              <li className="list-group-item" key={train.id}>
                <Trains
                  trainName={train.trainName}
                  trainNumber={train.trainNumber}
                  departureTime={train.departureTime}
                  seatsAvailable={train.seatsAvailable}
                  price={train.price}
                  delayTime={train.delayTime}
                  onClick={() => {
                    handleClick(train.trainNumber);
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {show && trainDetails && (
        <div>
          <h1>Train details for {trainNumber}</h1>
          <ul className="list-group">
            <li className="list-group-item">
              <p>Train Name: {trainDetails.trainName}</p>
              <p>Train Number: {trainDetails.trainNumber}</p>
              <p>
                Departure Time: {trainDetails.departureTime.Hours}:
                {trainDetails.departureTime.Minutes}:
                {trainDetails.departureTime.Seconds}
              </p>
              <p>
                Seats Available - Sleeper: {trainDetails.seatsAvailable.sleeper}
                , AC: {trainDetails.seatsAvailable.AC}
              </p>
              <p>
                Price - Sleeper: {trainDetails.price.sleeper}, AC:{" "}
                {trainDetails.price.AC}
              </p>
              <p>Delay Time: {trainDetails.delayTime} minutes</p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default App;
