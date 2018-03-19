const fs = require('fs');

let getGeuss = (w, x) => {
    if (x.length < w.length) {
        throw Error('w.length!=x.length');
    }
    let sum = 0;
    for (let i = 0; i < w.length; i++) {
        sum += w[i] * x[i];
    }
    let result = 1 / (1 + Math.exp(-sum));
    return result;
};
let correctGeuss = (w, x, target) => {
    return Math.abs(getGeuss(w, x) - target) < 0.1;
};
let getNewWeights = (w, x, target, learnRate) => {
    debugger;
    let error = target - getGeuss(w, x);
    for (let i = 0; i < w.length; i++) {
        w[i] = w[i] + error * x[i] * learnRate;
    }
    return w;
};
let trainPerceptron = (w, inputs, targets,learnRate) => {
    let stop = true;
    for (let i = 0; i < inputs.length; i++) {
        if (!correctGeuss(w, inputs[i], targets[i][0])) {
            w = getNewWeights(w, inputs[i], targets[i][0],learnRate);
            // fs.appendFileSync('results', `${w}\n`);
            // console.log(`${w}\n`);
            stop = false;
        }
    }
    if (!stop) return trainPerceptron(w, inputs, targets,learnRate);
    return w;
};

module.exports = {
    trainPerceptron,
    getGeuss,
    correctGeuss,
    getNewWeights
};
