import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { InterventoriaComponent } from './interventoria/interventoria.component';
import { InterventoriasComponent } from './interventorias/interventorias.component';
import { ModalInterventoriaComponent } from './modal-interventoria/modal-interventoria.component';
import { InterventoriaRoutingModule } from './interventoria-routing.module';
import { SharedModule } from '../../shared';
import { RootComponent } from './root/root.component';

@NgModule({
  imports: [
    CommonModule,
    InterventoriaRoutingModule,
    SharedModule
  ],
  declarations: [ProyectoComponent, InterventoriaComponent, InterventoriasComponent, ModalInterventoriaComponent, RootComponent],

  exports: [ ModalInterventoriaComponent
  ],
  entryComponents: [
    ModalInterventoriaComponent
  ]
})
export class InterventoriaModule { }
