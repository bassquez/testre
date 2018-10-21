import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuenteFinanciacionRoutingModule } from './fuente-financiacion-routing.module';
import { AddFuenteFinanciacionComponent } from './add-fuente-financiacion/add-fuente-financiacion.component';
import { AdminFuenteFinanciacionComponent } from './admin-fuente-financiacion/admin-fuente-financiacion.component';
import { FuenteFinanciacionComponent } from './fuente-financiacion/fuente-financiacion.component';
import { SharedModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    FuenteFinanciacionRoutingModule,
    SharedModule
  ],
  declarations: [AddFuenteFinanciacionComponent, AdminFuenteFinanciacionComponent, FuenteFinanciacionComponent]
})
export class FuenteFinanciacionModule { }
