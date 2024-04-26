"use client";
import React, { useEffect, useState } from "react";
import { createClient } from '../../utils/supabase/clients'
// import { deletePricingSubSheet }  from '../../api_requests/google_sheet_call/pricing/actions'
import ResumeDraftButton from "./adminSavedConfigsResumeDraft"
import MapSelectedBreakers from "./adminSavedConfigsSelectedBreakersMap";

function Saved_Configurations({ session }) {
  const supabase = createClient();
  const [configs, setConfigs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [expandedConfig, setExpandedConfig] = useState(null);

  const urlPath = process.env.NEXT_PUBLIC_PRICING_SHEET_ROUTEHANDLER_URL;

  const handleExpand = (id) => {
    setExpandedConfig(id === expandedConfig ? null : id);
  };

  async function getConfigs() {
    const userId = session?.user.id;
    try {
      const { data, error } = await supabase
        .from("Configurations")
        .select()
        .eq("user_id", userId);
      if (error) {
        throw new Error("Failed to retrieve data from the database.");
      }

      setConfigs(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteConfigs(id) {
    // Delete associated pricing Sheet
    try {
      // const { error } = await deletePricingSubSheet(id)

      const response = await fetch(`${urlPath}/deleteSubSheet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });

      if (error) {
        throw new Error("Failed to delete Sheet");
      }
    } catch (error) {
      console.error(error);
    }

    // Delete Configurations from DB
    try {
      const { data, error } = await supabase
        .from("Configurations")
        .delete()
        .eq("id", id);
      if (error) {
        throw new Error("Failed to delete data from the database.");
      }
      // Refresh the configurations after deletion
      getConfigs();
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = (id) => {
    setSelectedConfig(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteConfigs(selectedConfig);
    setShowModal(false);
  };

  useEffect(() => {
    getConfigs();
  }, []);

  return (
      <>
        <div className="list-group">
          <div className="list-group-item">
            <h2>Previous configurations</h2>
          </div>
          <div className="list-group-item">
            <div className="row">
              {configs.length > 0 ? (
                configs.map((configuration) => (
                  <div className="col-md-4 mb-3" key={configuration.id}>
                    <div className="card" style={{ width: "18rem" }}>
                      <img className="card-img-top" src="" alt="Card image cap" />
                      <div className="card-body">
                        <h5 className="card-title">Overview</h5>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            <strong>Project name:</strong>{" "}
                            {configuration.init_project}
                          </li>
                          <li className="list-group-item">
                            <strong>Created at:</strong>{" "}
                            {configuration.created_at
                              .substring(0, 19)
                              .replace("T", " ")}
                          </li>
                          <li className="list-group-item">
                            <strong>Client:</strong>{" "}
                            {configuration.init_client}
                          </li>
                          <li className="list-group-item">
                            <strong>Drawn by:</strong>{" "}
                            {configuration.init_drawn_by}
                          </li>
                          {expandedConfig === configuration.id && (
                            <>
                              <h5 className="card-title">Selected Switchboard</h5>
                              <li className="list-group-item">
                                <strong>Width:</strong>{" "}
                                {configuration.panel_width}
                              </li>
                              <li className="list-group-item">
                                <strong>Voltage:</strong>{" "}
                                {configuration.panel_voltage}
                              </li>
                              <li className="list-group-item">
                                <strong>KAIC rating:</strong>{" "}
                                {configuration.panel_KAIC_rating}
                              </li>
                              <li className="list-group-item">
                                <strong>Bus rating:</strong>{" "}
                                {configuration.panel_bus_rating}
                              </li>
                              <h5 className="card-title">Selected Breakers</h5>
                              <MapSelectedBreakers
                                config_state={configuration}
                              />
                              <h5 className="card-title">Order Details</h5>
                              <li className="list-group-item">
                                <strong>Order status:</strong>{" "}
                                {configuration.order_confirmed
                                  ? "Confirmed"
                                  : "Not confirmed"}
                              </li>
                            </>
                          )}
                        </ul>
                        <div className="row">
                          <button
                            type="button"
                            className="btn btn-primary mr-2"
                            onClick={() => handleExpand(configuration.id)}
                          >
                            {expandedConfig === configuration.id
                              ? "Collapse"
                              : "Expand"}
                          </button>
                          <ResumeDraftButton configFromDb={configuration} />
                          <button
                            type="button"
                            className="btn btn-danger mt-2"
                            onClick={() => handleDelete(configuration.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col">
                  <div className="alert alert-info" role="alert">
                    User has no configurations saved.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    
        <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this configuration?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Saved_Configurations;
