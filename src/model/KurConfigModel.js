export default class KurConfigModel {
  input = "";
  layers = [];
  activation = []
  example = "This is working.";

  setInput(input){
    this.input = input;
  }

  addLayer(layer){
    this.layers.push(layer);
  }

  setActivation(activation){
    this.activation = activation;
  }
}
