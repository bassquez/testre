import Ejecucion from '../models/ejecucion';
import BaseCtrl from './base';

export default class EjecucionCtrl extends BaseCtrl {
  model = Ejecucion;

  getForproyecto = (req, res) => {
    this.model.find({ proyecto: req.params.proyecto }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    }).populate('fuenteProyecto')
    .populate('proyecto');
  }
}
