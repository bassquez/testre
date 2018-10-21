import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../interventorias/interventorias.component';
import { InterventoriaService } from '../../../core/services/interventoria.service';
import { Interventoria } from '../../../core/models/interventoria.model';
import { Proyecto } from '../../../core/models/proyecto.model';
import { FuenteFinanciacionProyecto } from '../../../core/models/fuenteFinanciacionProyecto.model';
import { FuenteFinanciacionProyectoService } from '../../../core/services/fuenteFinanciacionProyecto.service';
import { ProyectoService } from '../../../core/services/proyecto.service';
import { Factura } from '../../../core/models/factura.model';
import { FacturaService } from '../../../core/services/factura.service';
import { FacturaInterventoriaService } from '../../../core/services/facturaInterventoria.service';
import { FacturaInterventoria } from '../../../core/models/facturaInterventoria.model';


@Component({
  selector: 'gp-modal-interventoria',
  templateUrl: './modal-interventoria.component.html',
  styleUrls: ['./modal-interventoria.component.scss']
})
export class ModalInterventoriaComponent implements OnInit {

  interventoria: Interventoria;

  fuentesPorProyecto: FuenteFinanciacionProyecto[] = [];
  _proyecto: Proyecto = {
    identificacion: '',
    interventor: {
      nombre: '',
      apellido: ''
    }
  };
  valdiadorInverison = false;

  fechaI = new Date(this.data.interventoria.proyecto.fechaInicio);
  fechaF = new Date(this.data.interventoria.proyecto.fechaFin);

  hoy = new Date();



  dias = this.diffdias(this.fechaI, this.fechaF);

  diasHoy = this.diffdias(this.fechaI, this.hoy);

  progreso = (this.diasHoy / this.dias) * 100;

  proyecto = {
    startDate: this.fechaI,
    endDate: this.fechaF,
    progreso: this.progreso
  };


  inversionTotal: number;
  diferenciaInversion = 0;
  facturasPorProyecto: Factura[] = [];
  facturasPorInterventoria: FacturaInterventoria[] = [];
  facturaValor = 0;
  facturaValorTotal = 0;
  facturasPorFuente = [];

  f: Object;
  sumaFacturas = 0;
  f2: Object;
  f3 = [];
  imprimible = '';


  constructor(
    public dialogRef: MatDialogRef<ModalInterventoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public interventoriaService: InterventoriaService,

    public fuenteFinanaciacionProyectoService: FuenteFinanciacionProyectoService,
    public proyectoService: ProyectoService,
    public facturaService: FacturaService,
    public facturaInterventoriaService: FacturaInterventoriaService
  ) { }

  ngOnInit() {
    this.getFuentesPorProyecto();
    this.getProyectoContratista();
    this.getValidadorInversion();
    this.getFacturaInterventoria();
    this.getFacturasPorProyecto();
  }
  
  print(): void {
    const printContents = document.getElementById('section').innerHTML;
    const popup = window.open('', '_blank',
    'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,'
    + 'location=no,status=no,titlebar=no');
    popup.document.open();
    popup.document.write('<!DOCTYPE html><html><head>  '
    + '<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css" '
    + 'media="screen,print">'
    + '<link rel="stylesheet" href="style.css" media="screen,print">'
    + '</head><body onload="window.print()"><div class="reward-body">'
    + printContents + '</div></html>');
  popup.onbeforeunload = function (event) {
    popup.close();

  };
  }

/* 

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <link rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
          crossorigin="anonymous">
          <style type="text/css">
          .interventoria{
            max-width: 20px;
            max-height: 20px;
            width: 1em;
            height: 1em;
            background: blue;
            border-radius: 50%
          }
          .sinInterventoria{
            max-width: 20px;
            max-height: 20px;
            width: 1em;
             height: 1em;
            background: red;
            border-radius: 50%
          }
          .otraInterventoria{
            max-width: 20px;
            max-height: 20px;
            width: 1em;
             height: 1em;
            background: gray;
            border-radius: 50%
          }
          </style>
        </head>
    <body onload="window.print();window.close()">
      <div class="container">
        ${printContents}
      </div></body>
      </html>`
    );
    popupWin.document.close();
  } */
  diffdias(fi: Date, ff: Date) {
    if (ff <= fi) {
      return 0;
    } else {
      return (ff.getTime() - fi.getTime()) / (1000 * 60 * 60 * 24);
    }

  }

  getValidadorInversion() {
    if (this.inversionTotal < this.data.interventoria.proyecto.inversion) {
      this.valdiadorInverison = true;
      this.diferenciaInversion = this.data.interventoria.proyecto.inversion - this.inversionTotal;
    }
  }
  getFuentesPorProyecto() {

    this.fuenteFinanaciacionProyectoService.getFuenteFinanciacionProyecto(this.data.interventoria.proyecto._id).subscribe(
      data => this.fuentesPorProyecto = data,
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
    this.facturaService.getFactura(this.data.interventoria.proyecto._id).subscribe(
      data => this.facturasPorProyecto = data,
      error => console.log(error),
      () => {
        this.facturaValorTotal = 0;
        for (let index = 0; index < this.facturasPorProyecto.length; index++) {
          this.facturaValorTotal = this.facturaValorTotal + this.facturasPorProyecto[index].valor;
        }
      }
    );
  }
  getFacturaInterventoria() {
    this.facturaInterventoriaService.getFacturaInterventoria(this.data.interventoria._id).subscribe(
      data => this.facturasPorInterventoria = data,
      error => console.log(error),
      () => {
        this.facturaValor = 0;
        for (let index = 0; index < this.facturasPorInterventoria.length; index++) {
          this.facturaValor = this.facturaValor + this.facturasPorInterventoria[index].factura.valor;
        }
      }
    );
  }
  getProyectoContratista() {

    this.proyectoService.getProyecto(this.data.interventoria.proyecto._id).subscribe(
      data => this._proyecto = data,
      error => console.log(error)
    );
  }


  facturasPorFuete() {

    for (let f = 0; f < this.fuentesPorProyecto.length; f++) {
      const fuente = this.fuentesPorProyecto[f];
      this.f = new Object();
      this.facturaService.getFacturaFuente(fuente.fuenteProyecto._id, this.data.interventoria.proyecto._id).subscribe(
        data => {
          this.sumaFacturas = 0;
          this.f3 = [];
          for (let index = 0; index < data.length; index++) {
            this.sumaFacturas = this.sumaFacturas + data[index].valor;
            let enInterventoria = false;
            const element = data[index];
            let i = 0;
            this.f2 = new Object();
            // console.log('element' + element._id);

            while (i < this.facturasPorInterventoria.length) {

              const e = this.facturasPorInterventoria[i];
              // console.log(e.factura._id);

              if (e.factura._id === element._id) {
                enInterventoria = true;
                break;
              }
              i++;
            }
            if (enInterventoria === true) {
              this.f2 = {
                factura: element,
                enInterventoria: true
              };
              this.f3.push(this.f2);
            } else {
              this.f2 = {
                factura: element,
                enInterventoria: false
              };
              this.f3.push(this.f2);
            }
          }
          this.f = {
            fuente: fuente,
            facturas: this.f3,
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
