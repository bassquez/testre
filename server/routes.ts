import * as express from 'express';

import UserCtrl from './controllers/user';

import ContratistaCtrl from './controllers/contratista';
import FuenteFCtrl from './controllers/fuenteFinanciacion';
import FfproyectoCtrl from './controllers/fuenteFinanciacionProyecto';
import ProyectoCtrl from './controllers/proyecto';
import InterventoriaCtrl from './controllers/interventoria';
import EjecucionCtrl from './controllers/ejecucion';
import FacturaCtrl from './controllers/factura';
import FacturaInterventoriaCtrl from './controllers/facturaInterventoria';


export default function setRoutes(app) {

  const router = express.Router();
  const userCtrl = new UserCtrl();
  const proyectoCtrl = new ProyectoCtrl();
  const fuenteFCtrl = new FuenteFCtrl();
  const contratistaCtrl = new ContratistaCtrl();
  const fuenteFinanaciacionProyectoCtrl = new FfproyectoCtrl();
  const interventoriaCtrl = new InterventoriaCtrl();
  const ejecucionCtrl = new EjecucionCtrl();
  const facturaCtrl = new FacturaCtrl();
  const facturaInterventoriaCtrl = new FacturaInterventoriaCtrl();

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);


  // Proyectos
  router.route('/proyectos').get(proyectoCtrl.getAll2);
  router.route('/proyectos/count').get(proyectoCtrl.count);
  router.route('/proyecto').post(proyectoCtrl.insert);
  router.route('/proyecto/:id').get(proyectoCtrl.getproyect);
  router.route('/proyecto/:id').put(proyectoCtrl.update);
  router.route('/proyecto/:id').delete(proyectoCtrl.delete);
  router.route('/proyecto/identificacion/:identificacion').get(proyectoCtrl.getByIdProyecto);
  router.route('/sproyecto/identificacion/:identificacion').get(proyectoCtrl.searchProyecto);

  // fuentes de financiacion
  router.route('/fuentesFinanciacion').get(fuenteFCtrl.getAll);
  router.route('/fuentesFinanciacion/count').get(fuenteFCtrl.count);
  router.route('/fuenteFinanciacion').post(fuenteFCtrl.insert);
  router.route('/fuenteFinanciacion/:id').get(fuenteFCtrl.get);
  router.route('/fuenteFinanciacion/:id').put(fuenteFCtrl.update);
  router.route('/fuenteFinanciacion/:id').delete(fuenteFCtrl.delete);

  // fuentes de financiacion
  router.route('/fuentesFinanaciacionProyecto').get(fuenteFinanaciacionProyectoCtrl.getAll);
  router.route('/fuenteFinanaciacionProyecto/count').get(fuenteFinanaciacionProyectoCtrl.count);
  router.route('/fuenteFinanaciacionProyecto').post(fuenteFinanaciacionProyectoCtrl.insert);
  router.route('/fuenteFinanaciacionProyecto/:id').get(fuenteFinanaciacionProyectoCtrl.get);
  router.route('/fuenteFinanaciacionProyecto/:id').put(fuenteFinanaciacionProyectoCtrl.update);
  router.route('/fuenteFinanaciacionProyecto/:id').delete(fuenteFinanaciacionProyectoCtrl.delete);
  router.route('/fuenteFinanaciacionProyecto/proyecto/:proyecto').get(fuenteFinanaciacionProyectoCtrl.getForproyecto);

  // Contratista
  router.route('/contratistas').get(contratistaCtrl.getAll);
  router.route('/contratistas/count').get(contratistaCtrl.count);
  router.route('/contratista').post(contratistaCtrl.insert);
  router.route('/contratista/:id').get(contratistaCtrl.get);
  router.route('/contratista/:id').put(contratistaCtrl.update);
  router.route('/contratista/:id').delete(contratistaCtrl.delete);
  router.route('/contratista/id/:identificacion').get(contratistaCtrl.getPorId);


  // Interventor
  router.route('/interventorias').get(interventoriaCtrl.getAll);
  router.route('/interventoria/count').get(interventoriaCtrl.count);
  router.route('/interventoria').post(interventoriaCtrl.insert);
  router.route('/interventoria/:id').get(interventoriaCtrl.get);
  router.route('/interventoria/:id').put(interventoriaCtrl.update);
  router.route('/interventoria/:id').delete(interventoriaCtrl.delete);
  router.route('/interventoria/proyecto/:proyecto').get(interventoriaCtrl.getForproyecto);


  // Interventor
  router.route('/ejecuciones').get(ejecucionCtrl.getAll);
  router.route('/ejecucion/count').get(ejecucionCtrl.count);
  router.route('/ejecucion').post(ejecucionCtrl.insert);
  router.route('/ejecucion/:id').get(ejecucionCtrl.get);
  router.route('/ejecucion/:id').put(ejecucionCtrl.update);
  router.route('/ejecucion/:id').delete(ejecucionCtrl.delete);
  router.route('/ejecucion/proyecto/:proyecto').get(ejecucionCtrl.getForproyecto);

  // fuentes de financiacion
  router.route('/facturas').get(facturaCtrl.getAll);
  router.route('/factura/count').get(facturaCtrl.count);
  router.route('/factura').post(facturaCtrl.insert);
  router.route('/factura/:id').get(facturaCtrl.get);
  router.route('/factura/:id').put(facturaCtrl.update);
  router.route('/factura/:id').delete(facturaCtrl.delete);
  router.route('/factura/proyecto/:proyecto').get(facturaCtrl.getForproyecto);
  router.route('/factura/proyecto2/:proyecto').get(facturaCtrl.getForproyecto2);
  router.route('/factura/fuente/:fuente/:proyecto').get(facturaCtrl.getForFuente);

  // fuentes de financiacion
  router.route('/facturaInterventorias').get(facturaInterventoriaCtrl.getAll);
  router.route('/facturaInterventoria/count').get(facturaInterventoriaCtrl.count);
  router.route('/facturaInterventoria').post(facturaInterventoriaCtrl.insert);
  router.route('/facturaInterventoria/:id').get(facturaInterventoriaCtrl.get);
  router.route('/facturaInterventoria/:id').put(facturaInterventoriaCtrl.update);
  router.route('/facturaInterventoria/:id').delete(facturaInterventoriaCtrl.delete);
  router.route('/facturaInterventoria/interventoria/:interventoria').get(facturaInterventoriaCtrl.getForInterventoria);
  

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
