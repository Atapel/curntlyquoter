"use client";
import { useRouter } from "next/navigation";
import { UseConfigurationReducerContext } from "@context/globalContext";
import { TConfigDB } from "@context/types";
interface IResumeDraftButtonProps {
  configFromDb: TConfigDB;
}
function ResumeDraftButton(props: IResumeDraftButtonProps) {
  const { state, dispatch } = UseConfigurationReducerContext();
  const router = useRouter();
  const loadConfigurationIntoState = (configObject: TConfigDB) => {
    dispatch({
      type: "LOAD_CONFIGURATION_FROM_DB",
      payload: configObject,
    });
    router.push("/configurator");
  };
  return (
    <button
      className="btn btn-success my-2"
      data-bs-dismiss="modal"
      onClick={() => {
        loadConfigurationIntoState(props.configFromDb);
      }}
    >
      Resume Configuration
    </button>
  );
}
export default ResumeDraftButton;