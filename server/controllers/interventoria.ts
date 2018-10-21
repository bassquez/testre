import Interventoria from '../models/interventoria';
import BaseCtrl from './base';

export default class InterventoriaCtrl extends BaseCtrl {
    model = Interventoria;

      getForproyecto = (req, res) => {
        this.model.find({ proyecto: req.params.proyecto }, (err, item) => {
          if (err) { return console.error(err); }
          res.status(200).json(item);
        })
        .populate('proyecto');
      }

}
