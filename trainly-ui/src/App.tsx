import { useEffect, useState } from "react";
import Train from "./Train";

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
    <div>
      <h1>Train Information</h1>
      <ul className="list-group">
        {trains.map((train: any) => (
          <li className="list-group-item" key={train.trainNumber}>
            <Train
              trainName={train.trainName}
              trainNumber={train.trainNumber}
              departureTime={train.departureTime}
              seatsAvailable={train.seatsAvailable}
              price={train.price}
              delayTime={train.delayTime}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
