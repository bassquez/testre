import { Component, OnInit, Input } from '@angular/core';
import { Proyecto } from '../../../core/models/proyecto.model';
import { FuenteFinanciacionProyecto } from '../../../core/models/fuenteFinanciacionProyecto.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FuenteFinanciacion } from '../../../core/models/fuenteFinanciacion.model';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FuenteFinanciacionService } from '../../../core/services/fuenteFinanciacion.service';
import { FuenteFinanciacionProyectoService } from '../../../core/services/fuenteFinanciacionProyecto.service';
import { ProyectoService } from '../../../core/services/proyecto.service';
import { FacturaService } from '../../../core/services/factura.service';
import { Factura } from '../../../core/models/factura.model';
import { Sort } from '@angular/material';
import { MatSort, MatTableDataSource } from '@angular/material';
import { isNumber } from 'util';

export interface FacturasPorFuente {

  fuente?: FuenteFinanciacion;
  facturas?: Factura[];
  totalFacturas?: number;
}

@Component({
  selector: 'gp-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {
  isEditing = false;

  facturasForm: FormGroup;

  factura = new Factura();

  proyecto = new FormControl('');
  fuenteFinanciacion = new FormControl('', [
    Validators.required
  ]);
  valor = new FormControl('', [
    Validators.required
  ]);
  _proyecto = new Proyecto();

  identificacion = new FormControl('', [
    Validators.required
  ]);

  fecha = new FormControl('', [
    Validators.required
  ]);

  fuentesFinanciacion: FuenteFinanciacion[] = [];

  facturasPorProyecto: Factura[] = [];

  proyectos: Proyecto[] = [];
  facturaValor = 0;

  id: string;
  fuentesPorProyecto: FuenteFinanciacionProyecto[] = [];
  f: Object;
  sumaFacturas = 0;
  f2: Factura[] = [];
  facturasPorFuente = [];
  fuente: FuenteFinanciacion;

  constructor(
    private _route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private fuentesFinanciacionService: FuenteFinanciacionService,
    private fuenteFinanaciacionProyectoService: FuenteFinanciacionProyectoService,
    private proyectoService: ProyectoService,
    private facturaService: FacturaService
  ) {
  }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this.getProyectoIdentificacion();
    this.facturasForm = this.formBuilder.group({
      proyecto: this.proyecto,
      fuenteFinanciacion: this.fuenteFinanciacion,
      identificacion: this.identificacion,
      valor: this.valor,
      fecha: this.fecha,
      avalado: false
    });
  }

  getProyectoIdentificacion() {
    this.proyectoService.getProyectoByIdentificacion(this.id).subscribe(
      data => this._proyecto = data,
      error => console.log(error),
      () => {
        this.facturasForm.get('proyecto').setValue(this._proyecto);
        this.getFacturasPorProyecto();
        this.getFuentesPorProyecto();
      }
    );

  }
  getfuentesFinanciacion() {
    this.fuentesFinanciacionService.getFuenteFinanciacions().subscribe(
      data => this.fuentesFinanciacion = data,
      error => console.log(error)
    );
  }

  getFuentesPorProyecto() {

    this.fuenteFinanaciacionProyectoService.getFuenteFinanciacionProyecto(this._proyecto._id).subscribe(
      data => this.fuentesPorProyecto = data,
      error => console.log(error)
    );
  }


  getProyectos() {
    this.proyectoService.getProyectos().subscribe(
      data => this.proyectos = data,
      error => console.log(error)
    );
  }
  addFactura() {
    let i = 0;
    let enFacturasFuentes = false;
    while (i < this.facturasPorFuente.length) {
      const element = this.facturasPorFuente[i];
      if (element.fuente.fuenteProyecto._id === this.fuente._id) {
        console.log('Encontró');
        enFacturasFuentes = true;
        break;
      }
      i++;
    }
    if (enFacturasFuentes === true) {
      const e = this.facturasPorFuente[i];
      const suma: number = +e.totalFacturas + +this.valor.value;

      console.log(suma);
      console.log(e.fuente.inversion);

      if (suma > e.fuente.inversion) {
        this.toast.setMessage('La Factura no se guardo por que la fuente de finanaciacion se lleno', 'danger');
      } else {
        this.facturaService.addFactura(this.facturasForm.value).subscribe(
          res => {
            this.toast.setMessage('Se guardo exitosamente la fuente!', 'success');
            // this.router.navigate(['//dashboard/proyecto/']);
          },
          error => this.toast.setMessage('La Factura no se guardo', 'danger'),
          () => this.getFacturasPorProyecto()
        );
        this.fuenteFinanciacion.reset();
        this.valor.reset();
        this.fuenteFinanciacion.clearValidators();
        this.valor.clearValidators();
      }
    }
  }
  deleteFactura(factura: Factura) {
    if (window.confirm('Estás segur@ que quieres Eliminar ' +
      factura.identificacion + ' de el proyecto ' + '?')) {
      this.facturaService.deleteFactura(factura).subscribe(
        data => this.toast.setMessage('proyecto deleted successfully.', 'success'),
        error => console.log(error),
        () => this.getFacturasPorProyecto()
      );
    }
  }

  enableEditing(factura: Factura) {
    this.isEditing = true;
    this.factura = factura;
  }

  cancelEditing() {
    this.isEditing = false;
    this.factura = new Factura();
    this.toast.setMessage('Edición cancelada.', 'warning');
    // reload the cats to reset the editing
    this.getFacturasPorProyecto();
  }

  editFactura(factura: Factura) {
    this.facturaService.editFactura(factura).subscribe(
      () => {
        this.isEditing = false;
        this.factura = factura;
        this.toast.setMessage('item editado con exito.', 'success');
        this.getFacturasPorProyecto();
      },
      error => console.log(error)
    );
  }

  getFacturasPorProyecto() {
    this.facturaService.getFactura(this._proyecto._id).subscribe(
      data => this.facturasPorProyecto = data,
      error => console.log(error),
      () => {
        this.facturaValor = 0;
        for (let index = 0; index < this.facturasPorProyecto.length; index++) {
          this.facturaValor = this.facturaValor + this.facturasPorProyecto[index].valor;
        }
        this.facturasPorFuete();

      }
    );
  }

  facturasPorFuete() {
    this.facturasPorFuente = [];
    for (let f = 0; f < this.fuentesPorProyecto.length; f++) {
      const fuente = this.fuentesPorProyecto[f];
      this.f = new Object();
      this.f2 = [];


      this.facturaService.getFacturaFuente(fuente.fuenteProyecto._id, this._proyecto._id).subscribe(
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
  }

  compareFn(proyecto1: Proyecto, proyecto2: Proyecto) {
    return proyecto1 && proyecto2 ? proyecto1.identificacion === proyecto2.identificacion : proyecto1 === proyecto2;
  }

}