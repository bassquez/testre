import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratistaRoutingModule } from './contratista-routing.module';
import { AddContratistaComponent } from './add-contratista/add-contratista.component';
import { AdminContratistaComponent } from './admin-contratista/admin-contratista.component';
import { ContratistaComponent } from './contratista/contratista.component';
import { SharedModule } from '../../shared';
import { EditarContratistaComponent } from './editar-contratista/editar-contratista.component';

@NgModule({
  imports: [
    CommonModule,
    ContratistaRoutingModule,
    SharedModule
  ],
  declarations: [AddContratistaComponent, AdminContratistaComponent, ContratistaComponent, EditarContratistaComponent]
})
export class ContratistaModule { }
