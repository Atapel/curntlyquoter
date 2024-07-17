import { TInitialBreaker } from "@context/types";

const MapSelectedBreakers = ({
  Breakers,
}: {
  Breakers: TInitialBreaker[] | null;
}) => {
  return (
    <>
      {Breakers &&
        Breakers.map((item, index) => (
          <div
            key={index}
            className="border p-2"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <p className="fw-bold">{item.SelectedBreaker.Description}</p>

            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Details
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div className="dropdown-item">Max Amp: {item.MaxAmp}</div>
            </div>
          </div>
        ))}
      {!Breakers && (
        <div className="alert alert-warning m-3">No breakers selected</div>
      )}
    </>
  );
};
export default MapSelectedBreakers;
