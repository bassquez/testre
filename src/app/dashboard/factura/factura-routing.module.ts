import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturaComponent } from './factura/factura.component';
import { RootComponent } from './root/root.component';
import { ProyectoComponent } from './proyecto/proyecto.component';

const routes: Routes = [{
  path: '',
  component: RootComponent,
  children: [
    {
      path: '',
      redirectTo: 'i',
      pathMatch: 'full'
    },
    {
      path: 'i',
      component: ProyectoComponent,
      data: {
        title: 'Proyectos'
      }
    },
    {
      path: 'facturas/:id',
      component: FacturaComponent,
      data: {
        title: 'Facturas'
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
