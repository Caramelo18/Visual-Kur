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

    console.log(Object.keys(file));
    for(let i = 0; i < file.length; i++){
      let element = file[i];
      console.log(element);
    }


  }

  getExample () {
    let exampleModel = new KurConfigModel();
    return exampleModel.example;
  }
}
