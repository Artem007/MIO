const fs=require('fs');

let getGeuss = (w, x, n) => {
  if (w.length != (x.length - 1)) throw Error('w.length!=x.length');
  let sum = 0;
  for (let i = 0; i < w.length; i++) {
    sum += w[i] * x[i];
  }
  // let result = 1 / (1 + Math.exp(-sum));
  // if(result>=n)return 1;
  // return 0;
  if(sum>=1)return 1;
  return 0;
}
let correctGeuss = (w, x, n) => {
  if (getGeuss(w, x, n) === x[x.length - 1]) return true;
  return false;
}
let getNewWeights = (w, x, n) => {
  let error = x[x.length - 1] - getGeuss(w, x, n);
  for (let i = 0; i < w.length; i++) {
    w[i] = w[i] + error * x[i];
  }
  return w;
}
let trainPerceptron = (w, inputs, n) => {
  let stop = true;
  for (let i = 0; i < inputs.length; i++) {
    if (!correctGeuss(w, inputs[i],n)) {
      w = getNewWeights(w, inputs[i], n);
      fs.appendFileSync('results',`${w}\n`);
      stop=false;
    }
  }
  if(!stop)return trainPerceptron(w, inputs, n);
  return w;
}

module.exports={trainPerceptron,getGeuss}
