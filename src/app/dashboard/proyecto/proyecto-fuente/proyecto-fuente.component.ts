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
import { Chart } from 'chart.js';
import { isNumber } from 'util';

@Component({
  selector: 'gp-proyecto-fuente',
  templateUrl: './proyecto-fuente.component.html',
  styleUrls: ['./proyecto-fuente.component.scss']
})
export class ProyectoFuenteComponent implements OnInit {
  isEditing = false;

  addfuentesProyectoForm: FormGroup;
  proyectoSearch: Proyecto = {
    _id: '1',
    inversion: 0
  };

  fuente = new FuenteFinanciacionProyecto();

  proyecto = new FormControl('');
  fuenteProyecto = new FormControl('', [
    Validators.required
  ]);
  inversion = new FormControl(this.proyectoSearch, [
    Validators.required
  ]);
  fuentesFinanciacion: FuenteFinanciacion[] = [];

  fuentesPorProyecto: FuenteFinanciacionProyecto[] = [];

  proyectos: Proyecto[] = [];
  inversionTotal = 0;

labels = [];
inversiones = [];
chartData = [
  {
    datasets: [{
      data: this.inversiones
  }]
  }
];
chartOptions = {
  responsive: true
};

public barChartLabels: string [] = [];
public barChartType = 'pie';
public barChartLegend = true;

public barChartData: any [] = [
  {data: null, label: 'Series A'},
  {data: null, label: 'Series B'}
];
  resultData: FuenteFinanciacionProyecto [] = [];
  loaded = false;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  constructor(
    private _route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private fuentesFinanciacionService: FuenteFinanciacionService,
    private fuenteFinanaciacionProyectoService: FuenteFinanciacionProyectoService,
    private proyectoService: ProyectoService
  ) { }

  ngOnInit() {
    
    this.proyectoSearch.identificacion = this._route.snapshot.paramMap.get('id');
    this.getProyectoIdentificacion();
    this.getProyectos();
    this.getfuentesFinanciacion();
    this.getDataFuentes();
    console.log (this.fuenteFinanaciacionProyectoService.getFuenteFinanciacionProyecto(this._route.snapshot.paramMap.get('id')));
    this.fuenteFinanaciacionProyectoService.getFuenteFinanciacionProyecto(this._route.snapshot.paramMap.get('id')).subscribe(
        response => {
        if (! response) {
          console.log ('error loading data');
        } else {
          this.resultData = response;
          this.barChartLabels = this.resultData.map (item => item.fuenteProyecto.nombre);

          const d1 = this.resultData.map (item => item.inversion);
          console.log ('this is the variable d1:' + d1);

          this.barChartData [0] = d1;

          this.loaded = true;
        }
      },
      error => {
        console.log (<any> error);
      }
    );
    this.addfuentesProyectoForm = this.formBuilder.group({
      proyecto: this.proyecto,
      fuenteProyecto: this.fuenteProyecto,
      inversion: this.inversion
    });
  }

  getProyectoIdentificacion() {
    this.proyectoService.getProyectoByIdentificacion(this.proyectoSearch.identificacion).subscribe(
      data => this.proyectoSearch = data,
      error => console.log(error),
      () => this.addfuentesProyectoForm.get('proyecto').setValue(this.proyectoSearch)
    );

  }
  getfuentesFinanciacion() {
    this.fuentesFinanciacionService.getFuenteFinanciacions().subscribe(
      data => this.fuentesFinanciacion = data,
      error => console.log(error)
    );
  }
  compareFn(proyecto1: Proyecto, proyecto2: Proyecto) {
    return proyecto1 && proyecto2 ? proyecto1.identificacion === proyecto2.identificacion : proyecto1 === proyecto2;
  }

  getProyectos() {
    this.proyectoService.getProyectos().subscribe(
      data => this.proyectos = data,
      error => console.log(error)
    );
  }
  addFuenteProyecto() {
    if (this.inversionTotal + this.inversion.value > this.proyectoSearch.inversion) {
      this.toast.setMessage('La Fuente no se guardo por que supera la Inversion', 'danger');
    } else {
      this.fuenteFinanaciacionProyectoService.addFuenteFinanciacionProyecto(this.addfuentesProyectoForm.value).subscribe(
        res => {
          this.toast.setMessage('Se guardo exitosamente la fuente!', 'success');
          // this.router.navigate(['//dashboard/proyecto/']);
        },
        error => this.toast.setMessage('La Fuente no se guardo', 'danger'),
        () => this.getFuentesPorProyecto()
      );
      this.fuenteProyecto.reset();
      this.inversion.reset();
      this.fuenteProyecto.clearValidators();
      this.inversion.clearValidators();
    }

  }
  deleteFuente(fuente: FuenteFinanciacionProyecto) {
    if (window.confirm('Estás segur@ que quieres Eliminar ' +
      fuente.fuenteProyecto.nombre + ' de el proyecto ' +
      fuente.proyecto.identificacion + '?')) {
      this.fuenteFinanaciacionProyectoService.deleteFuenteFinanciacionProyecto(fuente).subscribe(
        data => this.toast.setMessage('proyecto deleted successfully.', 'success'),
        error => console.log(error),
        () => this.getFuentesPorProyecto()
      );
    }
  }

  enableEditing(fuente: FuenteFinanciacionProyecto) {
    this.isEditing = true;
    this.fuente = fuente;
  }

  cancelEditing() {
    this.isEditing = false;
    this.fuente = new FuenteFinanciacionProyecto();
    this.toast.setMessage('Edición cancelada.', 'warning');
    // reload the cats to reset the editing
    this.getFuentesPorProyecto();
  }

  editFuente(fuente: FuenteFinanciacionProyecto) {
    this.fuenteFinanaciacionProyectoService.editFuenteFinanciacionProyecto(fuente).subscribe(
      () => {
        this.isEditing = false;
        this.fuente = fuente;
        this.toast.setMessage('item editado con exito.', 'success');
        this.getFuentesPorProyecto();
      },
      error => console.log(error)
    );
  }

  getFuentesPorProyecto() {

    this.proyectoSearch = this.proyecto.value;
    this.fuenteFinanaciacionProyectoService.getFuenteFinanciacionProyecto(this.proyectoSearch._id).subscribe(
      data => this.fuentesPorProyecto = data,
      error => console.log(error),
      () => {
        this.inversionTotal = 0;
        for (let index = 0; index < this.fuentesPorProyecto.length; index++) {
          this.inversionTotal = this.inversionTotal + this.fuentesPorProyecto[index].inversion;
        }
        this.getDataFuentes();
      }
    );
  }
  getDataFuentes() {
    for (let fuente = 0; fuente < this.fuentesPorProyecto.length; fuente++) {
      const label = this.fuentesPorProyecto[fuente].fuenteProyecto.nombre;
      const inversion = this.fuentesPorProyecto[fuente].inversion;
    }
  }

}
