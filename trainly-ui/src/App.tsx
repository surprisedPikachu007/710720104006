import { useEffect, useState } from "react";
import Trains from "./Trains";

const App = () => {
  const [trains, setTrains] = useState([]);

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

  return (
    <>
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
              onClick={() => console.log("Clicked!")}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
