import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { AdminProyectoComponent } from './admin-proyecto/admin-proyecto.component';
import { AddProyectoComponent } from './add-proyecto/add-proyecto.component';
import { ProyectoFuenteComponent } from './proyecto-fuente/proyecto-fuente.component';
// import { ProyectoFuenteComponent } from './proyecto-fuente/proyecto-fuente.component';

const routes: Routes = [{
  path: '',
  component: ProyectoComponent,
  children: [
    {
      path: '',
      redirectTo: 'admin-proyecto',
      pathMatch: 'full'
    },
    {
      path: 'admin-proyecto',
      component: AdminProyectoComponent,
      data: {
        title: 'Administrar Proyectos'
      }
    },
    {
      path: 'add-proyecto',
      component: AddProyectoComponent,
      data: {
        title: 'Registrar Proyecto'
      }
    },
    {
      path: 'add-fuentes/:id',
      component: ProyectoFuenteComponent,
      data: {
        title: 'Registrar Fuetes Proyecto'
      }
    },
    {
      path: 'add-fuentes',
      component: ProyectoFuenteComponent,
      data: {
        title: 'Registrar Fuetes Proyecto'
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectoRoutingModule { }
