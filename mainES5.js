"use strickt";

function Sigmoid(value) {
  return 1 / (1 + Math.exp(-value));
}

function NeuralFactor(weight) {
  this.weight = weight;
  this.delta = 0;
}

function Neuron(isInput) {
  let self = this;
  this.output = 0;
  this.error = 0;
  this.bias = new NeuralFactor(isInput ? 0 : Math.random());
  this.input = [];


  this.pulse = function() {
    self.output = 0;
    self.input.forEach(function(item) {
      self.output += item.signal.output * item.factor.weight;
    });
    self.output += self.bias.weight;
    self.output = Sigmoid(self.output);
  };

  this.findInput = function(signal) {
    let input = self.input.filter(function(input) {
      return signal == input.signal;
    })[0];
    return input;
  };
}

function NeuralLayer() {
  let self = this;
  this.neurons = [];

  this.pulse = function() {
    self.neurons.forEach(function(neuron) {
      neuron.pulse();
    });
  };

  this.train = function(learningRate) {
    self.neurons.forEach(function(neuron) {
      neuron.bias.weight += neuron.bias.delta * learningRate;
      neuron.bias.delta = 0;
      neuron.input.forEach(function(input) {
        input.factor.weight += input.factor.delta * learningRate;
        input.factor.delta = 0;
      })
    })
  }
}

function NeuralNet(inputCount, hiddenCount, outputCount) {
  let self = this;
  this.inputLayer = new NeuralLayer();
  this.hiddenLayer = new NeuralLayer();
  this.outputLayer = new NeuralLayer();
  this.learningRate = 0.5;

  for (let i = 0; i < inputCount; i++)
    self.inputLayer.neurons.push(new Neuron(true));

  for (let i = 0; i < hiddenCount; i++)
    self.hiddenLayer.neurons.push(new Neuron());

  for (let i = 0; i < outputCount; i++)
    self.outputLayer.neurons.push(new Neuron());

  for (let i = 0; i < hiddenCount; i++) {
    for (let j = 0; j < inputCount; j++) {
      self.hiddenLayer.neurons[i].input.push({
        signal: self.inputLayer.neurons[j],
        factor: new NeuralFactor(Math.random())
      });
    }
  }
  for (let i = 0; i < outputCount; i++) {
    for (let j = 0; j < hiddenCount; j++) {
      self.outputLayer.neurons[i].input.push({
        signal: self.hiddenLayer.neurons[j],
        factor: new NeuralFactor(Math.random())
      });
    }
  }
  this.pulse = function() {
    self.hiddenLayer.pulse();
    self.outputLayer.pulse();
  };
  this.backPropagation = function(desiredResults) {
    for (let i = 0; i < self.outputLayer.neurons.length; i++) {
      let outputNeuron = self.outputLayer.neurons[i];
      let output = outputNeuron.output;
      outputNeuron.error = (desiredResults[i] - output) * output * (1.0 - output);
    }
    for (let i = 0; i < self.hiddenLayer.neurons.length; i++) {
      let hiddenNeuron = self.hiddenLayer.neurons[i];
      let error = 0;
      for (let j = 0; j < self.outputLayer.neurons.length; j++) {
        let outputNeuron = self.outputLayer.neurons[j];
        error += outputNeuron.error * outputNeuron.findInput(hiddenNeuron).factor.weight * hiddenNeuron.output * (1.0 - hiddenNeuron.output);
      }
      hiddenNeuron.error = error;
    }
    for (let j = 0; j < self.outputLayer.neurons.length; j++) {
      let outputNeuron = self.outputLayer.neurons[j];
      for (let i = 0; i < self.hiddenLayer.neurons.length; i++) {
        let hiddenNeuron = self.hiddenLayer.neurons[i];
        outputNeuron.findInput(hiddenNeuron).factor.delta += outputNeuron.error * hiddenNeuron.output;
      }
      outputNeuron.bias.delta += outputNeuron.error * outputNeuron.bias.weight;
    }
    for (let j = 0; j < self.hiddenLayer.neurons.length; j++) {
      let hiddenNeuron = self.hiddenLayer.neurons[j];
      for (let i = 0; i < self.inputLayer.neurons.length; i++) {
        let inputNeuron = self.inputLayer.neurons[i];
        hiddenNeuron.findInput(inputNeuron).factor.delta += hiddenNeuron.error * inputNeuron.output;
      }
      hiddenNeuron.bias.delta += hiddenNeuron.error * hiddenNeuron.bias.weight;
    }
  };

  this.train = function(input, desiredResults) {
    for (let i = 0; i < self.inputLayer.neurons.length; i++) {
      let neuron = self.inputLayer.neurons[i];
      neuron.output = input[i];
    }
    self.pulse();
    self.backPropagation(desiredResults);
    self.hiddenLayer.train(self.learningRate);
    self.outputLayer.train(self.learningRate);
  };
  // this.getAllNeurons=()=>{
  //     console.log('input');
  //     console.log(self.inputLayer);
  //     console.log('hidden');
  //     console.log(self.hiddenLayer);
  //     console.log('output');
  //     console.log(self.outputLayer);
  // };
}

let net = new NeuralNet(2, 2, 1);

let testInputs = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1]
];
let testOutputs = [
  [1],
  [0],
  [0],
  [1]
];

for (let i = 0; i < 20001; i++)
  for (let j = 0; j < 4; j++)
    net.train(testInputs[j], testOutputs[j]);

function UseNet(a, b) {
  net.inputLayer.neurons[0].output = a;
  net.inputLayer.neurons[1].output = b;
  net.pulse();
  return net.outputLayer.neurons[0].output;
}

console.log(UseNet(0, 0));
console.log(UseNet(1, 0));
console.log(UseNet(0, 1));
console.log(UseNet(1, 1));
