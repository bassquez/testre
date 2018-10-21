import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RootComponent } from './root/root.component';

const routes: Routes = [{
  path: '',
  component: RootComponent,
  children: [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      component: DashboardComponent,
      data: {
        title: 'Tablero de Trabajo'
      }
    } ,
    {
      path: 'proyecto',
      loadChildren: 'app/dashboard/proyecto/proyecto.module#ProyectoModule'
    },
    {
      path: 'interventoria',
      loadChildren: 'app/dashboard/interventoria/interventoria.module#InterventoriaModule'
    },
    {
      path: 'contratista',
      loadChildren: 'app/dashboard/contratista/contratista.module#ContratistaModule'
    },
    {
      path: 'fuente-financiacion',
      loadChildren: 'app/dashboard/fuente-financiacion/fuente-financiacion.module#FuenteFinanciacionModule'
    },
    {
      path: 'factura',
      loadChildren: 'app/dashboard/factura/factura.module#FacturaModule'
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
