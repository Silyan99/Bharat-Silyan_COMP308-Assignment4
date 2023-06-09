//
//https://github.com/PacktPublishing/Hands-on-Machine-Learning-with-TensorFlow.js/tree/master/Section5_4
//
const tf = require("@tensorflow/tfjs");
//require("@tensorflow/tfjs-node");
//load iris training and testing data
const iris = require("../../iris.json");
//const irisTesting = require("../../iris-testing.json");
var lossValue;
//
exports.trainAndPredict = function (req, res) {
  console.log(req.body);
  var input_sepal_length = parseFloat(req.body.sepal_length);
  var input_sepal_width = parseFloat(req.body.sepal_width);
  var input_petal_width = parseFloat(req.body.petal_width);
  var input_petal_length = parseFloat(req.body.petal_length);
  var input_epochs = parseInt(req.body.epochs);
  var input_learning_rate = parseFloat(req.body.learning_rate);

    //tensor of features for training data
  // include only features, not the output
  const trainingData = tf.tensor2d(
    iris.map((item) => [
      item.sepal_length,
      item.sepal_width,
      item.petal_length,
      item.petal_width,
    ])
  );

  const outputData = tf.tensor2d(
    iris.map((item) => [
      item.species === "setosa" ? 1 : 0,
      item.species === "virginica" ? 1 : 0,
      item.species === "versicolor" ? 1 : 0,
    ])
  );

  // test with user input
  const testingData = tf.tensor2d([
    [
      input_sepal_length,
      input_sepal_width,
      input_petal_length,
      input_petal_width,
    ],
  ]);
  console.log(testingData.dataSync());
  console.log("input_epochs", input_epochs);
  //
  // build neural network using a sequential model
  const model = tf.sequential();
  //add the first layer
  model.add(
    tf.layers.dense({
      inputShape: [4], // four input neurons
      activation: "sigmoid",
      units: 5, //dimension of output space (first hidden layer)
    })
  );
  //add the hidden layer
  model.add(
    tf.layers.dense({
      inputShape: [5], //dimension of hidden layer
      activation: "sigmoid",
      units: 3, //dimension of final output (setosa, virginica, versicolor)
    })
  );
  //add output layer
  model.add(
    tf.layers.dense({
      activation: "sigmoid",
      units: 3, //dimension of final output (setosa, virginica, versicolor)
    })
  );
  //compile the model with an MSE loss function and Adam algorithm
  model.compile({
    loss: "meanSquaredError",
    optimizer: tf.train.adam((learning_rate = input_learning_rate)),
  });
  console.log(model.summary());
  //
  //Train the model and predict the results for testing data
  //
  // train/fit the model for the fixed number of epochs
  async function run() {
    const startTime = Date.now();
    //train the model
    await model.fit(trainingData, outputData, {
      epochs: input_epochs,
      callbacks: {
        //list of callbacks to be called during training
        onEpochEnd: async (epoch, log) => {
          lossValue = log.loss;
          console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
          elapsedTime = Date.now() - startTime;
          console.log("elapsed time: " + elapsedTime);
        },
      },
    });

    const results = model.predict(testingData);
    //console.log('prediction results: ', results.dataSync())
    //results.print()

    // get the values from the tf.Tensor
    //var tensorData = results.dataSync();
    results.array().then((array) => {
      console.log(array[0][0]);
      var resultForData1 = array[0];
      var resultForData2 = array[1];
      var resultForData3 = array[2];
      var dataToSent = {
        row1: resultForData1,
        row2: resultForData2,
        row3: resultForData3,
      };
      console.log(resultForData1);
      res.status(200).send(dataToSent);
      
    });
    //
  } //end of run function
  run();
};
