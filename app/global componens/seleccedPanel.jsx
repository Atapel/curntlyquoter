const DisplaySelectedPanel = (props) => {
  return (
      <ul>
        <li
          className="list-group-item"
          data-testid={`${props.configuration.init_project}-Width`}
        >
          <strong>Width:</strong> {props.configuration.panel_width}
        </li>

        <li
          className="list-group-item"
          data-testid={`${props.configuration.init_project}-Width`}
        >
          <strong>Heigh:</strong> {props.configuration.panel_width}
        </li>

        <li
          className="list-group-item"
          data-testid={`${props.configuration.init_project}-Voltage`}
        >
          <strong>Voltage:</strong> {props.configuration.panel_voltage}
        </li>

        <li
          className="list-group-item"
          data-testid={`${props.configuration.init_project}-Kaic`}
        >
          <strong>KAIC rating:</strong> {props.configuration.panel_KAIC_rating}
        </li>
        <li
          className="list-group-item"
          data-testid={`${props.configuration.init_project}-Bus`}
        >
          <strong>Bus rating:</strong> {props.configuration.panel_bus_rating}
        </li>
        <li
          className="list-group-item"
          data-testid={`${props.configuration.init_project}-Width`}
        >
          <strong>Service or Distribution:</strong>{" "}
          {props.configuration.panel_width}
        </li>
        <li
          className="list-group-item"
          data-testid={`${props.configuration.init_project}-Width`}
        >
          <strong>Feed Type:</strong> {props.configuration.panel_width}
        </li>

        {props.configuration.SelectedFeedType === "Main Breaker" ? (
          <li>
            <h5>Feed thru lugs:</h5>
            {props.configuration.FeedThruLugs ? "Yes" : "No"}
          </li>
        ) : props.configuration.SelectedFeedType === "Main Lug" ? (
          <li>Feed Position:{props.configuration.SelectedFeedPosition}</li>
        ) : null}
      </ul>
  );
};

export default DisplaySelectedPanel;



