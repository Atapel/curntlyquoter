const MapSelectedBreakers = (config_state) => {
  let selectedBreakers = config_state.config_state.selected_breakers
  return (
    <>
      {selectedBreakers && selectedBreakers.map((item, index) => (
        <li key={index} className="list-group-item">
          <div className="row">
            <div className="col">
              {item.Description}
            </div>
            <div className="col">
              <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Details
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <div className="dropdown-item">Max Amp: {item.Max_Amperage}</div>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default MapSelectedBreakers;
