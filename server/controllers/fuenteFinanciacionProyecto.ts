import FuenteFinanciacionProyecto from '../models/fuenteFinanciacionProyecto';
import BaseCtrl from './base';

export default class FfproyectoCtrl extends BaseCtrl {
  model = FuenteFinanciacionProyecto;

  getForproyecto = (req, res) => {
    this.model.find({ proyecto: req.params.proyecto }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    }).populate('fuenteProyecto')
      .populate('proyecto');
  }

}
