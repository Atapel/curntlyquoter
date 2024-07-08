"use client";
import { useEffect } from "react";
import { TConfigDB } from "@context/types";
import ResumeDraftButton from "./adminSavedConfigsResumeDraft";
import DisplaySelectedPanel from "@global_components/selectedPanel";
import MapSelectedBreakers from "./adminSavedConfigsSelectedBreakersMap";
function ExpandedConfigModal(props) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
      <button
        type="button"
        className="btn btn-primary w-100 my-2"
        data-bs-toggle="modal"
        data-bs-target={`#expandConfigModal${props.id}`}
      >
        Show Details
      </button>

      <div
        className="modal fade"
        id={`expandConfigModal${props.id}`}
        // tabindex="-1"
        aria-labelledby={`expandConfigModal${props.id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id={`expandConfigModal${props.id}Label`}
              >
                Detailed Overview
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <section className="border my-2 p-2">
                <h5 className="">Selected Switchboard</h5>
                <DisplaySelectedPanel
                  Id={props.id}
                  Width={props.configuration.panel_width}
                  Height={props.configuration.panel_height}
                  Voltage={props.configuration.panel_voltage}
                  KAIC={props.configuration.panel_KAIC_rating}
                  Bus={props.configuration.panel_bus_rating}
                  ServiceDistribution={
                    props.configuration.panel_service_distribution
                  }
                  FeedType={props.configuration.panel_feed_type}
                  FeedThruLugs={props.configuration.panel_feed_thru_lugs}
                  FeedPosition={props.configuration.panel_feed_position}
                />
              </section>

              <section className="border my-2 p-2 ">
                <h5 className="">Selected Breakers</h5>
                <MapSelectedBreakers config_state={props.configuration} />
              </section>

              <section className="border my-2 p-2">
                <h5 className="">Order Details</h5>
                <ul>
                  <li
                    className="list-group-item"
                    data-testid={`${props.configuration.init_project}`}
                  >
                    <strong>Order status:</strong>{" "}
                    {props.configuration.order_confirmed
                      ? "Confirmed"
                      : "Not confirmed"}
                  </li>
                  {/* <li className="list-group-item">
                    <strong>Order date:</strong>
                  </li>
                  <li className="list-group-item">
                    <strong>Price:</strong>
                  </li> */}
                </ul>
              </section>
            </div>
            <div className="modal-footer">
              <ResumeDraftButton configFromDb={props.configuration} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExpandedConfigModal;
