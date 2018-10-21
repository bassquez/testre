import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaComponent } from './factura/factura.component';
import { RootComponent } from './root/root.component';
import { FacturaRoutingModule } from './factura-routing.module';
import { SharedModule } from '../../shared';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { FacturasComponent } from './facturas/facturas.component';

@NgModule({
  imports: [
    CommonModule,
    FacturaRoutingModule,
    SharedModule
  ],
  declarations: [FacturaComponent, RootComponent, ProyectoComponent, FacturasComponent]
})
export class FacturaModule { }
