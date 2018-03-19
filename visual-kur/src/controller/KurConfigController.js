import KurConfigModel from '../model/KurConfigModel'

export default class KurConfigController {
  getExample () {
    let exampleModel = new KurConfigModel();
    return exampleModel.example;
  }
}
