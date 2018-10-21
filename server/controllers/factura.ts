import Factura from '../models/factura';
import BaseCtrl from './base';

export default class FfproyectoCtrl extends BaseCtrl {
  model = Factura;

  getForproyecto = (req, res) => {
    this.model.find({ proyecto: req.params.proyecto }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    }).populate('fuenteFinanciacion')
      .populate('proyecto');
  }

  getForproyecto2 = (req, res) => {
    this.model.find({ proyecto: req.params.proyecto , avalado: false}, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }

  getForFuente = (req, res) => {
    this.model.find({ fuenteFinanciacion: req.params.fuente, proyecto: req.params.proyecto }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    }).populate('fuenteFinanciacion')
      .populate('proyecto');
  }

}
