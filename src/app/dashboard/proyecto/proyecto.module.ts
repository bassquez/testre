import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectoRoutingModule } from './proyecto-routing.module';
import { AddProyectoComponent } from './add-proyecto/add-proyecto.component';
import { AdminProyectoComponent } from './admin-proyecto/admin-proyecto.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { SharedModule } from '../../shared';
import { ModalFuenteProyectoComponent } from './modal-fuente-proyecto/modal-fuente-proyecto.component';
import { ProyectoFuenteComponent } from './proyecto-fuente/proyecto-fuente.component';
import { ModalDetalleProyectoComponent } from './modal-detalle-proyecto/modal-detalle-proyecto.component';
import { ModalEditarProyectoComponent } from './modal-editar-proyecto/modal-editar-proyecto.component';


@NgModule({
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    SharedModule
  ],
  declarations: [
    AddProyectoComponent,
    AdminProyectoComponent,
    ProyectoComponent,
    ModalFuenteProyectoComponent,
    ProyectoFuenteComponent,
    ModalDetalleProyectoComponent,
    ModalEditarProyectoComponent
  ],
  exports: [
    ModalFuenteProyectoComponent,
    ModalDetalleProyectoComponent,
    ModalEditarProyectoComponent,
  ],
  entryComponents: [
    ModalFuenteProyectoComponent,
    ModalDetalleProyectoComponent,
    ModalEditarProyectoComponent,
  ]
})
export class ProyectoModule { }
