import KurConfigModel from '../model/KurConfigModel'
import yamljs from 'yamljs';

export default class KurConfigController {
  constructor() {
    this.loadFile('./mnist.yml');
  }

  loadFile(filename){
    const file = yamljs.load(filename);
    this.parseFile(file.model);
  }

  parseFile(file){
    this.model = new KurConfigModel();

    for(let i = 0; i < file.length; i++){
      let element = file[i];
        let layer = this.getLayer(element);
        this.model.addLayer(layer);
    }
    console.log(this.model);
  }

  getLayer(element){
    let layer = {};

    if(element.hasOwnProperty('input')){
      layer.type = "input";
      layer.input = element["input"];
    }
    if(element.hasOwnProperty('convolution')){
      layer.type = "convolution";
      let components = element.convolution;
      this.addLayerComponents(layer, components);
    }else if(element.hasOwnProperty('activation')){
      layer.type = "activation";
      layer.activation = element.activation;

      if(element.hasOwnProperty("name")){
        layer.name = element["name"];
      }
    }else if(element.hasOwnProperty('pool')){
      layer.type = "pool";
      let components = element.pool;
      this.addLayerComponents(layer, components);
    }else if(element.hasOwnProperty('flatten')){
      layer.type = "flatten";
      let components = element.flatten;
      this.addLayerComponents(layer, components);
    }else if(element.hasOwnProperty('dense')){
      layer.type = "dense";
      let components = element.dense;
      let arr = {x: components[0], y: components[1]};
      layer["dense"] = arr;
    }

    return layer;
  }

  addLayerComponents(layer, element){
    for(let property in element){
      if(Array.isArray(element[property])){
        let arr = {x: element[property][0], y: element[property][1]};
        layer[property] = arr;
        continue;
      }
      layer[property] = element[property];
    }
  }

  getExample () {
    return "This is working";
  }


}
