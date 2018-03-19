"use strickt";

let {NeuralNet, predict} = require('./utils/neuralNetwork');
let {trainPerceptron, getGeuss, correctGeuss, getNewWeights} = require('./utils/trainPerceptron');

let testInputs = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
];
let testOutputs = [[1], [0], [0], [1]];
let weights = [[0.4, 0.5], [0.45, 0.35], [0.5, 0.6]];

//NETWORK
// let net = new NeuralNet(2, 2, 1, 0.7, weights);
// for (let i = 0; i < 2000; i++) {
//     for (let j = 0; j < 4; j++)
//         net.train(testInputs[j], testOutputs[j]);
// }
// console.log(predict([0, 0], net));
// console.log(predict([1, 0], net));
// console.log(predict([0, 1], net));
// console.log(predict([0, 0], net));


//PERCEPTRON  XOR
// trainPerceptron(weights[0],testInputs,testOutputs,0.7);


//PERCEPTRON NOT XOR test
// let inputs = [
//     [0, 2, 0, 0],
//     [0, 1, 3, 3],
//     [1, 0, 1, 2],
//     [1, 1, 0, 0]
// ];
// let outputs = [[1], [0], [0], [1]];
// let weights1 = [0.4, 0.5, 0.35, 0.65];
//
// console.log('BEFORE TRAIN');
// console.log(getGeuss(weights1, inputs[0]));
// console.log(getGeuss(weights1, inputs[1]));
// console.log(getGeuss(weights1, inputs[2]));
// console.log(getGeuss(weights1, inputs[3]));
//
// let newWeights=trainPerceptron(weights1, inputs, outputs, 0.7);
//
// console.log();
// console.log('AFTER TRAIN');
// console.log(getGeuss(newWeights,inputs[0]));
// console.log(getGeuss(newWeights,inputs[1]));
// console.log(getGeuss(newWeights,inputs[2]));
// console.log(getGeuss(newWeights,inputs[3]));