import React from "react";
import { UseConfigurationReducerContext } from "@context/globalContext";
import DisplaySelectedPanel from "@global_components/selectedPanel";
const DisplaySelectedFrame = (props) => {
  const { state, dispatch } = UseConfigurationReducerContext();
  const [panelSelected, setPanelSelected] = props.renderstate;
  const handleReset = () => {
    dispatch({ type: "RESET_CONFIGURATION" });
    setPanelSelected(false);
  };
  return (
    <>
      <div className="border p-2">
        <h2 className="">Selected Frame: </h2>
        <DisplaySelectedPanel
          Id={state.Metadata.DatabaseID}
          Width={state.Configuration.SelectedFrameSize}
          Height={state.Configuration.SelectedPanelHeight}
          Voltage={state.Configuration.SelectedVoltage}
          KAIC={state.Configuration.SelectedKAICRating}
          Bus={state.Configuration.SelectedBusRating}
          ServiceDistribution={state.Configuration.SelectedServiceDistribution}
          FeedType={state.Configuration.SelectedFeedType}
          FeedThruLugs={state.Configuration.FeedThruLugs}
          FeedPosition={state.Configuration.SelectedFeedPosition}
        />
        <button
          className="btn btn-outline-danger w-100"
          onClick={() => handleReset()}
        >
          Reset
        </button>
      </div>
    </>
  );
};
export default DisplaySelectedFrame;
