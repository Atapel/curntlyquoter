"use client";
import { useEffect } from "react";
import { deleteConfigs } from "../../actions";
function DeleteConfigPopUp(props) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
      <button
        type="button"
        className="btn btn-danger w-100"
        data-bs-toggle="modal"
        data-bs-target={`#deleteConfigModal${props.id}`}
        // data-testid={`Delete-Config-${configuration.init_project}`}
      >
        Delete Configuration
      </button>

      <div
        className="modal fade"
        id={`deleteConfigModal${props.id}`}
        aria-labelledby={`deleteConfigModal${props.id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title fs-5"
                id={`deleteConfigModal${props.id}Label`}
              >
                Confirm Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this configuration?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  deleteConfigs(props.id);
                }}
                data-testid={`Confirm-Delete-Config`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteConfigPopUp;
