import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import PredictForm from "./componenets/PrdictForm";
// import "./App.css";
//
function App() {
  // const [data, setData] = useState({});
  // const [showLoading, setShowLoading] = useState(false);
  // const apiUrl = "http://localhost:3000/run";
  // //runs once after the first rendering of page
  // useEffect(() => {
  //   const fetchData = async () => {
  //     axios
  //       .get(apiUrl)
  //       .then((result) => {
  //         console.log("result.data:", result.data);
  //         setData(result.data);
  //         setShowLoading(false);
  //       })
  //       .catch((error) => {
  //         console.log("error in fetchData:", error);
  //       });
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <div>
        {/* <Button type="button" variant="primary" onClick={() => {}}>
          Edit
        </Button> */}
      </div>
      <div>
        <PredictForm />
      </div>
    </div>
  );
}
//
export default App;
