import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import { Proyecto } from '../../../core/models/proyecto.model';
// import { GanttComponent, GanttConfiguration, GanttTaskItem, GanttTaskLink, GanttEvents } from 'gantt-ui-component';
import { IGanttOptions, Zooming } from '../../../shared/lib';
import { FuenteFinanciacionProyecto } from '../../../core/models/fuenteFinanciacionProyecto.model';
import { FuenteFinanciacionProyectoService } from '../../../core/services/fuenteFinanciacionProyecto.service';
import { ProyectoService } from '../../../core/services/proyecto.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { FacturaService } from '../../../core/services/factura.service';
import { Factura } from '../../../core/models/factura.model';
import { FuenteFinanciacion } from '../../../core/models/fuenteFinanciacion.model';

export interface DialogData {
  proyecto: Proyecto;
}

@Component({
  selector: 'gp-modal-detalle-proyecto',
  templateUrl: './modal-detalle-proyecto.component.html',
  styleUrls: ['./modal-detalle-proyecto.component.scss']
})
export class ModalDetalleProyectoComponent implements OnInit {

  fuentesPorProyecto: FuenteFinanciacionProyecto[] = [];
  _proyecto: Proyecto = {};
  valdiadorInverison = false;

  fechaI = new Date(this.data.proyecto.fechaInicio);
  fechaF = new Date(this.data.proyecto.fechaFin);

  hoy = new Date();


  dias = this.diffdias(this.fechaI, this.fechaF);

  diasHoy = this.diffdias(this.fechaI, this.hoy);

  progreso = (this.diasHoy / this.dias) * 100;

  proyecto = {
    startDate: this.fechaI,
    endDate: this.fechaF,
    progreso: this.progreso
  };

  facturas: Factura[] = [];
  facturasPorFuente = [];
  inversionTotal: number;
  diferenciaInversion = 0;
  verComponenteFuentes = false;
  facturaValor = 0;
  f: Object;
  sumaFacturas = 0;
  f2: Factura[] = [];
  dataSource = new MatTableDataSource();
    displayedColumns: string[] =['rubro', 'nombre'];
  constructor(
    public dialogRef: MatDialogRef<ModalDetalleProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public fuenteFinanaciacionProyectoService: FuenteFinanciacionProyectoService,
    public proyectoService: ProyectoService,
    public auth: AuthService,
    public router: Router,
    public facturaService: FacturaService
  ) { }

  ngOnInit() {
    this.getProyecto();
    this.getFuentesPorProyecto();
    this.getValidadorInversion();
    this.getFacturasPorProyecto();

  }

  diffdias(fi: Date, ff: Date) {
    if (ff <= fi) {
      return 0;
    } else {
      return (ff.getTime() - fi.getTime()) / (1000 * 60 * 60 * 24);
    }

  }
  editarFuentes(proyecto: Proyecto) {
    this.router.navigate(['/dashboard/proyecto/add-fuentes/' + proyecto.identificacion]);
  }

  getValidadorInversion() {
    console.log('Diferencia Inversion: ' + this.diferenciaInversion);
    if (this.inversionTotal < this.data.proyecto.inversion) {
      this.valdiadorInverison = true;
      this.diferenciaInversion = this.data.proyecto.inversion - this.inversionTotal;
    }
  }
  getFuentesPorProyecto() {

    this.fuenteFinanaciacionProyectoService.getFuenteFinanciacionProyecto(this.data.proyecto._id).subscribe(
      data => {
        this.dataSource.data = data;
        this.fuentesPorProyecto = data;
      },
      error => console.log(error),
      () => {
        this.inversionTotal = 0;
        for (let index = 0; index < this.fuentesPorProyecto.length; index++) {
          this.inversionTotal = this.inversionTotal + this.fuentesPorProyecto[index].inversion;
        }
        this.facturasPorFuete();
      }
    );
  }
  getFacturasPorProyecto() {
    this.facturaService.getFactura(this.data.proyecto._id).subscribe(
      data => this.facturas = data,
      error => console.log(error),
      () => {
        this.facturaValor = 0;
        for (let index = 0; index < this.facturas.length; index++) {
          this.facturaValor = this.facturaValor + this.facturas[index].valor;
        }
      }
    );
  }
  interventoria() {
    this.router.navigate(['/dashboard/interventoria/interventorias/' + this._proyecto.identificacion]);

  }
  getProyecto() {

    this.proyectoService.getProyecto(this.data.proyecto._id).subscribe(
      data => this._proyecto = data,
      error => console.log(error)
    );
  }
  facturasPorFuete() {

    for (let f = 0; f < this.fuentesPorProyecto.length; f++) {
      const fuente = this.fuentesPorProyecto[f];
      this.f = new Object();
      this.f2 = [];


      this.facturaService.getFacturaFuente(fuente.fuenteProyecto._id, this.data.proyecto._id).subscribe(
        data => {
          this.sumaFacturas = 0;
          this.f2 = data;
          for (let index = 0; index < this.f2.length; index++) {
            this.sumaFacturas = this.sumaFacturas + this.f2[index].valor;
          }
          this.f = {
            fuente: fuente,
            facturas: data,
            totalFacturas: this.sumaFacturas
          };
          this.facturasPorFuente.push(this.f);
        },
        error => console.log(error)
      );

    }
    console.log(this.facturasPorFuente);
  }
}
