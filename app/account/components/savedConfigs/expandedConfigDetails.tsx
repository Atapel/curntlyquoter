"use client";
import { useEffect } from "react";
import { TConfigDB } from "@context/types";
import ResumeDraftButton from "./adminSavedConfigsResumeDraft";
import DisplaySelectedPanel from "@global_components/selectedPanel";
import MapSelectedBreakers from "./adminSavedConfigsSelectedBreakersMap";
function ExpandedConfigModal({ configuration }: { configuration: TConfigDB }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
      <button
        type="button"
        className="btn btn-primary w-100 my-2"
        data-bs-toggle="modal"
        data-bs-target={`#expandConfigModal${configuration.id}`}
      >
        Show Details
      </button>

      <div
        className="modal fade"
        id={`expandConfigModal${configuration.id}`}
        // tabindex="-1"
        aria-labelledby={`expandConfigModal${configuration.id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id={`expandConfigModal${configuration.id}Label`}
              >
                Detailed Overview
              </h1>
              <button
                type="button"
                className="btn-close border bg-danger"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <section className="border my-2 p-2">
                <h5 className="">Selected Switchboard</h5>
                <DisplaySelectedPanel
                  Id={configuration.id}
                  Width={configuration.panel_width}
                  Height={configuration.panel_height}
                  Voltage={configuration.panel_voltage}
                  KAIC={configuration.panel_KAIC_rating}
                  Bus={configuration.panel_bus_rating}
                  ServiceDistribution={configuration.panel_service_distribution}
                  FeedType={configuration.panel_feed_type}
                  FeedThruLugs={configuration.panel_feed_thru_lugs}
                  FeedPosition={configuration.panel_feed_position}
                />
              </section>

              <section className="border my-2 p-2 ">
                <h5 className="">Selected Breakers</h5>
                <MapSelectedBreakers
                  Breakers={configuration.selected_breakers}
                />
              </section>

              <section className="border my-2 p-2">
                <h5 className="">Order Details</h5>
                <ul>
                  <li
                    className="list-group-item"
                    data-testid={`${configuration.init_project}`}
                  >
                    <strong>Order status:</strong>{" "}
                    {configuration.order_confirmed
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
              <ResumeDraftButton configFromDb={configuration} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExpandedConfigModal;
