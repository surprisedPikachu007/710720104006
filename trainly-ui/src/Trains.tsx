interface Props {
  trainName: string;
  trainNumber: string;
  departureTime: { Hours: number; Minutes: number; Seconds: number };
  seatsAvailable: { sleeper: number; AC: number };
  price: { sleeper: number; AC: number };
  delayTime: number;
  onClick?: () => void;
}

const Trains = ({
  trainName,
  trainNumber,
  departureTime,
  seatsAvailable,
  price,
  delayTime,
  onClick,
}: Props) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Train Name: {trainName}</h5>
        <p className="card-text">Train Number: {trainNumber}</p>
        <p className="card-text">
          Departure Time: {departureTime.Hours}:{departureTime.Minutes}:
          {departureTime.Seconds}
        </p>
        <p className="card-text">
          Seats Available - Sleeper: {seatsAvailable.sleeper}, AC:{" "}
          {seatsAvailable.AC}
        </p>
        <p className="card-text">
          Price - Sleeper: {price.sleeper}, AC: {price.AC}
        </p>
        <p className="card-text">Delay Time: {delayTime} minutes</p>
        <a href="#" className="btn btn-primary" onClick={onClick}>
          View Details
        </a>
      </div>
    </div>
  );
};

export default Trains;
