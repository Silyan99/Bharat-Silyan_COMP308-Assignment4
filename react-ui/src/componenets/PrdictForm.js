import React, { useState } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
/*
5.4
3.9
1.7
0.4
100
0.06
*/

function PredictForm() {
  const [result, setResult] = useState([]);
  const [flowerData, setFlowerData] = useState({
    sepal_length: "",
    sepal_width: "",
    petal_length: "",
    petal_width: "",
    epochs: "",
    learning_rate: "",
    species: "",
  });

  const trainAndPredict = () => {
    console.log("send data : ", flowerData);
    axios.post(`http://localhost:3000/run`, flowerData).then((res) => {
      console.log(res.data);
      // setResult(Array.from(res.data.row1));
      const arr = res.data.row1;
      console.log(arr[0]);
      setResult(arr);
      // res.data.row1.map((item) => setResult((arr) => [...arr, item]));
      console.log("result", result);
      let index = arr.indexOf(Math.max(...arr));
      let name = "";
      console.log("max num : " + index, arr);
      if (index == 0) {
        name = "setosa";
      }
      if (index == 1) {
        name = "virginica";
      }
      if (index == 2) {
        name = "versicolor";
      }
      console.log("name", name);
      setFlowerData({ ...flowerData, species: name });

      console.log("getSpecies", flowerData);
    });
  };

  const resetData = () => {
    setFlowerData({
      sepal_length: "",
      sepal_width: "",
      petal_length: "",
      petal_width: "",
      epochs: "",
      learning_rate: "",
      species: "",
    });

    setResult([]);
  };

  const onChange = (e) => {
    e.persist();
    setFlowerData({ ...flowerData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {flowerData.species === "" ? (
        <Jumbotron>
          <Form onSubmit={trainAndPredict}>
            <Form.Group>
              <Form.Label>Sepal Length</Form.Label>
              <Form.Control
                type="number"
                name="sepal_length"
                id="sepal_length"
                placeholder="Enter sepal length"
                value={flowerData.sepal_length}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Sepal Width</Form.Label>
              <Form.Control
                type="number"
                name="sepal_width"
                id="sepal_width"
                placeholder="Enter sepal width"
                value={flowerData.sepal_width}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Petal Length</Form.Label>
              <Form.Control
                type="number"
                name="petal_length"
                id="petal_length"
                placeholder="Enter last name"
                value={flowerData.petal_length}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Petal Width</Form.Label>
              <Form.Control
                type="number"
                name="petal_width"
                id="petal_width"
                placeholder="Enter petal width"
                value={flowerData.petal_width}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Epochs</Form.Label>
              <Form.Control
                type="number"
                name="epochs"
                id="epochs"
                placeholder="Enter epoch"
                value={flowerData.epochs}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>learning rate</Form.Label>
              <Form.Control
                type="number"
                name="learning_rate"
                id="learning_rate"
                placeholder="Enter learning rate"
                value={flowerData.learning_rate}
                onChange={onChange}
              />
            </Form.Group>

            <Button onClick={trainAndPredict}>Predict</Button>
          </Form>
        </Jumbotron>
      ) : (
        <div>
          <h2>Result : {flowerData.species}</h2>
          {result.length > 0 &&
            result.map((value, index) => <h4 key={index}>{value}</h4>)}
          <Button onClick={resetData}>Try Again!</Button>
        </div>
      )}
    </div>
  );
}
export default PredictForm;

// {result.length != 0 &&
//   result.map((value, index) => {
//     <h4>{value}</h4>;
//   })}
