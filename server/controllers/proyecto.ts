import BaseCtrl from './base';
import Proyecto from '../models/proyecto';

import Contratista from '../models/contratista';

export default class UserCtrl extends BaseCtrl {
  model = Proyecto;

  addProyectoFuente = (req, res) => {
    Proyecto.findOneAndUpdate({ _id: req.params.id }, { '$push': { 'fuenteFProyecto': req.params.fuenteFProyecto } }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }

  getAll2 = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    }).populate('contratista')
      .populate('interventor');
  }

  getForproyecto = (req, res) => {
    this.model.find({ proyecto: req.params.proyecto }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    }).populate('fuenteProyecto')
      .populate('proyecto');
  }
  getproyect = (req, res) => {
    this.model.findOne({ _id: req.params.id }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    }).populate('contratista')
      .populate('interventor');
  }

  getByIdProyecto = (req, res) => {
    this.model.findOne({ identificacion: req.params.identificacion }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    }).populate('contratista')
      .populate('interventor');
  }

  searchProyecto = (req, res) => {
    this.model.find({ identificacion: { '$regex': req.params.identificacion, '$options': 'i' } }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    }).populate('contratista')
      .populate('interventor');
  }
}
