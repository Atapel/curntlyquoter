import ConfigCards from "./savedConfigCards";
import {TConfigDB} from "@context/types";
import {getConfigs} from "../actions" 
async function Saved_Configurations() {

  // Typescript Error needs to be fixed.
  // No error thrown when null type values are being returned
  // as object values, even though values of object keys are
  // explicitly stated in type declaaration. Find out why?????
  const configsFromDB:TConfigDB[] = await getConfigs();
  return (
    <div className="list-group">
      <div className="list-group-item">
        <h2>Previous configurations</h2>
      </div>
      <div className="list-group-item">
        <div className="row">
          <ConfigCards configs={configsFromDB}/>
        </div>
      </div>
    </div>
  );
}
export default Saved_Configurations;