"use client"
import { FunctionComponent, useState } from 'react';
import { TConfigDB } from '@context/types';
import {deleteConfigs} from "../actions" 
import ResumeDraftButton from "./adminSavedConfigsResumeDraft"
import MapSelectedBreakers from "./adminSavedConfigsSelectedBreakersMap";
interface configCardsProps {
    configs: TConfigDB[]
}
 
function ConfigCards(props: configCardsProps): FunctionComponent<configCardsProps> {
    const [showModal, setShowModal] = useState(false);
    const [selectedConfig, setSelectedConfig] = useState(null);
    const [expandedConfig, setExpandedConfig] = useState(null);
    const handleExpand = (id: string) => {
        setExpandedConfig(id === expandedConfig ? null : id);       
    };
    const handleDelete = (id: string) => {
        setSelectedConfig(id);
        setShowModal(true);
    };
    
    const confirmDelete = () => {
        deleteConfigs(selectedConfig);
        setShowModal(false);
    };
    console.log("props.configs",props.configs);
    
    return (
        <>
            <div className="list-group-item">
                <div className="row">
                    {props.configs.length > 0 ? (
                        props.configs.map((configuration: TConfigDB) => (
                        <div className="col-md-4 mb-3" key={configuration.id}>
                            <div className="card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                <li className="list-group-item" data-testid={`${configuration.init_project}-TestId`}>
                                    <strong>Project name:</strong>{" "}
                                    {configuration.init_project}
                                </li>
                                <li 
                                    className="list-group-item" 
                                    // data-testid={`${configuration.init_project}`}
                                >
                                    <strong>Created at:</strong>{" "}
                                    {configuration.init_created_at
                                    .substring(0, 19)
                                    .replace("T", " ")}
                                </li>
                                <li 
                                    className="list-group-item" 
                                    // data-testid={`${configuration.init_project}`}
                                >
                                    <strong>Client:</strong>{" "}
                                    {configuration.init_client}
                                </li>
                                <li 
                                    className="list-group-item" 
                                    // data-testid={`${configuration.init_project}`}
                                >
                                    <strong>Drawn by:</strong>{" "}
                                    {configuration.init_drawn_by}
                                </li>
                                {expandedConfig === configuration.id && (
                                    <>
                                    <h5 className="card-title">Selected Switchboard</h5>
                                    <li 
                                        className="list-group-item" 
                                        data-testid={`${configuration.init_project}-Width`}
                                    >
                                        <strong>Width:</strong>{" "}
                                        {configuration.panel_width}
                                    </li>
                                    <li 
                                        className="list-group-item" 
                                        data-testid={`${configuration.init_project}-Voltage`}
                                    >
                                        <strong>Voltage:</strong>{" "}
                                        {configuration.panel_voltage}
                                    </li>
                                    <li 
                                        className="list-group-item" 
                                        data-testid={`${configuration.init_project}-Kaic`}
                                    >
                                        <strong>KAIC rating:</strong>{" "}
                                        {configuration.panel_KAIC_rating}
                                    </li>
                                    <li 
                                        className="list-group-item" 
                                        data-testid={`${configuration.init_project}-Bus`}
                                    >
                                        <strong>Bus rating:</strong>{" "}
                                        {configuration.panel_bus_rating}
                                    </li>
                                    <h5 className="card-title">Selected Breakers</h5>
                                    <MapSelectedBreakers
                                        config_state={configuration}
                                    />
                                    <h5 className="card-title">Order Details</h5>
                                    <li 
                                        className="list-group-item" 
                                        data-testid={`${configuration.init_project}`}
                                    >
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
                                data-testid={`Delete-Config-${configuration.init_project}`}
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
            {/* <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog"> */}
            {/* <div className={`modal ${showModal ? 'show' : ''}`} role="dialog"> */}
            {showModal == true ? (
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
                        <button data-testid={`Confirm-Delete-Config`}type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            ) : null}
            
            {/* </div> */}
        </>
     );
}
 
export default ConfigCards;