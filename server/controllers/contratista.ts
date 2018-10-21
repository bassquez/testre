import Contratista from '../models/contratista';
import BaseCtrl from './base';

export default class ContratistaCtrl extends BaseCtrl {
  model = Contratista;
  getPorId = (req, res) => {
    this.model.find({ identificacion: req.params.identificacion }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }
}
