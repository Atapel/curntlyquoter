import { TConfigDB } from "@context/types";
// import DeleteConfigPopUp from "./deletePopup";
// import ResumeDraftButton from "./adminSavedConfigsResumeDraft";
import ExpandedConfigModal from "./expandedConfigDetails";
import DeleteConfigPopUp from "./deletePopup";
interface configCardsProps {
  configs: TConfigDB[];
}
function ConfigCards(props: configCardsProps) {
  return (
    <div className="border d-flex flex-row justify-between flex-wrap">
      {props.configs.length > 0 ? (
        props.configs.map((configuration: TConfigDB) => (
          <div
            className="border m-2 bg-light"
            key={configuration.id}
            style={{ width: "18rem" }}
          >
            {/* Config overview */}
            <ul
              className="p-2"
              style={{
                listStyleType: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <li
                className=""
                data-testid={`${configuration.init_project}-TestId`}
              >
                <strong>Project name:</strong> {configuration.init_project}
              </li>
              <li
                className=""
                // data-testid={`${configuration.init_project}`}
              >
                <strong>Created: </strong>{" "}
                {configuration.init_created_at.substring(
                  0,
                  configuration.init_created_at.indexOf("T")
                )}
                {/* {configuration.init_created_at.substring(0, 19).replace("T", " ")} */}
              </li>
              <li
                className=""
                // data-testid={`${configuration.init_project}`}
              >
                <strong>Client:</strong> {configuration.init_client}
              </li>

              <li
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ExpandedConfigModal configuration={configuration} />
                <DeleteConfigPopUp
                  // data-testid={`Delete-Config-${configuration.init_project}`}
                  id={configuration.id}
                />
              </li>
            </ul>
          </div>
        ))
      ) : (
        <div className="alert alert-info m-3" role="alert">
          User has no configurations saved.
        </div>
      )}
    </div>
  );
}

export default ConfigCards;
