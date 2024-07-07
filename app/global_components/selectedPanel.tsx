const DisplaySelectedPanel = ({
  Id,
  Width,
  Height,
  Voltage,
  KAIC,
  Bus,
  ServiceDistribution,
  FeedType,
  FeedThruLugs,
  FeedPosition,
}) => {
  return (
    <ul className="" key={Id} id={`PanelOverview${Id}`}>
      <li
        className="list-group-item"
        // data-testid={`${props.configuration.init_project}-Width`}
      >
        <strong>Width: </strong>
        {Width}
      </li>

      <li
        className="list-group-item"
        // data-testid={`${props.configuration.init_project}-Height`}
      >
        <strong>Heigh: </strong>
        {Height}
      </li>

      <li
        className="list-group-item"
        // data-testid={`${props.configuration.init_project}-Voltage`}
      >
        <strong>Voltage: </strong>
        {Voltage}
      </li>

      <li
        className="list-group-item"
        // data-testid={`${props.configuration.init_project}-Kaic`}
      >
        <strong>KAIC rating: </strong>
        {KAIC}
      </li>
      <li
        className="list-group-item"
        // data-testid={`${props.configuration.init_project}-Bus`}
      >
        <strong>Bus rating: </strong>
        {Bus}
      </li>
      <li
        className="list-group-item"
        // data-testid={`${props.configuration.init_project}-Service-Distribution`}
      >
        <strong>Service or Distribution: </strong>
        {ServiceDistribution}
      </li>
      <li
        className="list-group-item"
        // data-testid={`${props.configuration.init_project}-Feed-Type`}
      >
        <strong>Feed Type: </strong> {FeedType}
      </li>

      {FeedType === "Main Breaker" ? (
        <li className="list-group-item">
          <strong>Feed thru lugs: </strong>
          {FeedThruLugs ? "Yes" : "No"}
        </li>
      ) : FeedType === "Main Lug" ? (
        <li className="list-group-item">
          <strong>Feed Position: </strong>
          {FeedPosition}
        </li>
      ) : null}
    </ul>
  );
};

export default DisplaySelectedPanel;
