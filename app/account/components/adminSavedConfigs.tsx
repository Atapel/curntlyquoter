// import { useEffect, useState } from "react";
import ConfigCards from "./savedConfigCards"; // Assuming this is a Teact component
import { TConfigDB } from "@context/types";
import { getConfigs } from "../actions";
async function Saved_Configurations() {
  // Fetch data using the useEffect hook or a custom data fetching function
  // const [configsFromDB, setConfigsFromDB] = useState<TConfigDB[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  const configsFromDB = await getConfigs(); // Assuming getConfigs is available
  // setConfigsFromDB(configs);
  //   };
  //   fetchData();
  // }, []);

  // Handle potential loading state or errors if needed

  return (
    <div className="list-group">
      <div className="list-group-item">
        <h2>Previous configurations</h2>
      </div>
      <div className="list-group-item">
        <div className="row">
          <ConfigCards configs={configsFromDB} />
        </div>
      </div>
    </div>
  );
}

export default Saved_Configurations;
