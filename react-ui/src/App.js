import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import PredictForm from "./componenets/PrdictForm";
// import "./App.css";
//
function App() {

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
