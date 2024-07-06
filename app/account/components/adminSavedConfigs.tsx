import ConfigCards from "./savedConfigs/savedConfigCards"; // Assuming this is a Teact component
import { getConfigs } from "../actions";
async function Saved_Configurations() {
  const configsFromDB  = await getConfigs(); // Assuming getConfigs is available
  // Sort all configs for order finalized
  // const drafts = []
  // const finalized = []
  return (
    <div className="border" style={{ margin: "1rem" }}>
      <h2 className="border">Draft configurations</h2>
      <ConfigCards configs={configsFromDB} />
      {/* <h2 className="border">Finalized Orders</h2> */}
    </div>
  );
}
export default Saved_Configurations;