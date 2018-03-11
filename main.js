"use strict"
let {trainPerceptron} = require('./utils/trainPerceptron');
let {getGeuss} = require('./utils/trainPerceptron');

//V1
// let inputs = [
//   // [x1, x2, f(sum)],
//   [-3, 2, 1],
//   [-2, 3, 1],
//   [-2, 6, 1],
//   [-5, 4, 1],
//   [3, 4, 0],
//   [3, 1, 0],
//   [5, 3, 0],
//   [6, 1, 0],
// ];
// let weights = [1, 1];
//
// console.log(trainPerceptron(weights, inputs, 0.5));
// console.log(getGeuss([1, 1], inputs[0], 0.5));
// console.log(getGeuss([1, 1], inputs[1], 0.5));
// console.log(getGeuss([1, 1], inputs[2], 0.5));
// console.log(getGeuss([1, 1], inputs[3], 0.5));
// console.log(getGeuss([1,1],inputs[4],0.5));
// console.log(getGeuss([1,1],inputs[5],0.5));
// console.log(getGeuss([1,1],inputs[6],0.5));
// console.log(getGeuss([1,1],inputs[7],0.5));

//V2
// let inputs = [
//   // [x1, x2, x3, f(sum)],
//   [4, 1, 1, 1],
//   [4, 0, 1, 0],
//   [4, 1, 0, 0]
// ];
// let weights = [1, 1, 1];
//
// console.log(trainPerceptron(weights, inputs, 0.5));

//V3
// let inputs = [
//   // [x1, x2, x3,x4,x5,x6,x7,x8,x9,x10 f(sum)],
//   [10, 14, 13, -17, 0, -19, 0, -13, -14, 0, 1],
//   [2, 3, 1, 5, 7, 2, 2, 3, 4, 10, 0],
//   [1, 4, 3, 7, 4, 9, 2, 2, 48, 1, 1],
//   [2, 3, 1, 5, 7, 2, 2, 3, 4, 10, 0],
//   [2, 3, 1, 11, 12, 14, 21, 3, 4, 10, 1],
//   [2, 3, 1, 15, 7, 2, 2, 3, 4, 10, 0],
//   [2, 3, 1, 5, 18, 14, 2, 11, 12, 10, 0],
// ];
//
// let weights = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
//
// console.log(trainPerceptron(weights, inputs, 0.5));
