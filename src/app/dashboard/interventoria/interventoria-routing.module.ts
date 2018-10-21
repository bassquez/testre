import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { InterventoriaComponent } from './interventoria/interventoria.component';
import { InterventoriasComponent } from './interventorias/interventorias.component';
import { RootComponent } from './root/root.component';

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
        title: 'Interventorias'
      }
    },
    {
      path: 'interventoria/:id',
      component: InterventoriaComponent,
      data: {
        title: 'Registrar Interventoria'
      }
    },
    {
      path: 'interventorias/:id',
      component: InterventoriasComponent,
      data: {
        title: 'Ver Interventorias'
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterventoriaRoutingModule { }
