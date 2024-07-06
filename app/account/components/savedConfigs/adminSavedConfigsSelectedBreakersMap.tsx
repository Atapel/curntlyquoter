import { TInitialBreaker, TConfigDB } from "@context/types";
interface selectedBreakersProps {
  config_state: TConfigDB;
}
const MapSelectedBreakers = (props: selectedBreakersProps) => {
  let selectedBreakers: TInitialBreaker[] =
    props.config_state.selected_breakers;
  return (
    <>
      {selectedBreakers &&
        selectedBreakers.map((item, index) => (
          <div
            key={index}
            className="border m-2 p-2 d-flex flex-row justify-content: space-between"
          >
            <p>{item.SelectedBreaker.Description}</p>

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
      {!selectedBreakers && (
        <div className="alert alert-warning m-3">No breakers selected</div>
      )}
    </>
  );
};
export default MapSelectedBreakers;