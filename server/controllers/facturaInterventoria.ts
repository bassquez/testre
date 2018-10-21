import FacturaInterventoria from '../models/facturaInterventoria';
import BaseCtrl from './base';

export default class FfproyectoCtrl extends BaseCtrl {
  model = FacturaInterventoria;

  getForInterventoria = (req, res) => {
    this.model.find({ interventoria: req.params.interventoria }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    }).populate('factura');
  }
}
