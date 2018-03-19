let Sigmoid = (value) => {
    return 1 / (1 + Math.exp(-value));
};

class NeuralFactor {
    constructor(weight) {
        this.weight = weight;
        this.delta = 0;
    }
}

class Neuron {
    constructor(isInput) {
        this.output = 0;
        this.error = 0;
        this.bias = new NeuralFactor(isInput ? 0 : Math.random());
        this.input = [];
    }

    pulse() {
        this.output = 0;
        this.input.forEach((item) => {
            this.output += item.signal.output * item.factor.weight;
        });
        this.output += this.bias.weight;
        this.output = Sigmoid(this.output);
    };

    findInput(signal) {
        let input = this.input.filter(function (input) {
            return signal == input.signal;
        })[0];
        return input;
    };
}

class NeuralLayer {
    constructor(){
        this.neurons = [];
    }
    pulse () {
        this.neurons.forEach(function (neuron) {
            neuron.pulse();
        });
    };
    train (learningRate) {
        this.neurons.forEach((neuron)=> {
            neuron.bias.weight += neuron.bias.delta * learningRate;
            neuron.bias.delta = 0;
            neuron.input.forEach((input)=> {
                input.factor.weight += input.factor.delta * learningRate;
                input.factor.delta = 0;
            })
        })
    }

}

class NeuralNet {
    constructor(inputCount, hiddenCount, outputCount, learnRate, weights) {
        this.inputLayer = new NeuralLayer();
        this.hiddenLayer = new NeuralLayer();
        this.outputLayer = new NeuralLayer();
        this.learningRate = learnRate;

        for (let i = 0; i < inputCount; i++)
            this.inputLayer.neurons.push(new Neuron(true));

        for (let i = 0; i < hiddenCount; i++)
            this.hiddenLayer.neurons.push(new Neuron());

        for (let i = 0; i < outputCount; i++)
            this.outputLayer.neurons.push(new Neuron());

        for (let i = 0; i < hiddenCount; i++) {
            for (let j = 0; j < inputCount; j++) {
                this.hiddenLayer.neurons[i].input.push({
                    signal: this.inputLayer.neurons[j],
                    factor: new NeuralFactor(weights[i][j])
                });
            }
        }
        for (let i = 0; i < outputCount; i++) {
            for (let j = 0; j < hiddenCount; j++) {
                this.outputLayer.neurons[i].input.push({
                    signal: this.hiddenLayer.neurons[j],
                    factor: new NeuralFactor(weights[2][j])
                });
            }
        }
    }

    pulse  () {
        this.hiddenLayer.pulse();
        this.outputLayer.pulse();
    };
    backPropagation (desiredResults) {
        for (let i = 0; i < this.outputLayer.neurons.length; i++) {
            let outputNeuron = this.outputLayer.neurons[i];
            let output = outputNeuron.output;
            outputNeuron.error = (desiredResults[i] - output) * output * (1.0 - output);
        }
        for (let i = 0; i < this.hiddenLayer.neurons.length; i++) {
            let hiddenNeuron = this.hiddenLayer.neurons[i];
            let error = 0;
            for (let j = 0; j < this.outputLayer.neurons.length; j++) {
                let outputNeuron = this.outputLayer.neurons[j];
                error += outputNeuron.error * outputNeuron.findInput(hiddenNeuron).factor.weight * hiddenNeuron.output * (1.0 - hiddenNeuron.output);
            }
            hiddenNeuron.error = error;
        }
        for (let j = 0; j < this.outputLayer.neurons.length; j++) {
            let outputNeuron = this.outputLayer.neurons[j];
            for (let i = 0; i < this.hiddenLayer.neurons.length; i++) {
                let hiddenNeuron = this.hiddenLayer.neurons[i];
                outputNeuron.findInput(hiddenNeuron).factor.delta += outputNeuron.error * hiddenNeuron.output;
            }
            outputNeuron.bias.delta += outputNeuron.error * outputNeuron.bias.weight;
        }
        for (let j = 0; j < this.hiddenLayer.neurons.length; j++) {
            let hiddenNeuron = this.hiddenLayer.neurons[j];
            for (let i = 0; i < this.inputLayer.neurons.length; i++) {
                let inputNeuron = this.inputLayer.neurons[i];
                hiddenNeuron.findInput(inputNeuron).factor.delta += hiddenNeuron.error * inputNeuron.output;
            }
            hiddenNeuron.bias.delta += hiddenNeuron.error * hiddenNeuron.bias.weight;
        }
    };

    train (input, desiredResults) {
        for (let i = 0; i < this.inputLayer.neurons.length; i++) {
            let neuron = this.inputLayer.neurons[i];
            neuron.output = input[i];
        }
        this.pulse();
        this.backPropagation(desiredResults);
        this.hiddenLayer.train(this.learningRate);
        this.outputLayer.train(this.learningRate);
    };
}

function predict(input, net) {
    net.inputLayer.neurons[0].output = input[0];
    net.inputLayer.neurons[1].output = input[1];
    net.pulse();
    return net.outputLayer.neurons[0].output;
}

module.exports={NeuralNet,predict};