import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from '../../../core/models/proyecto.model';
import { ProyectoService } from '../../../core/services/proyecto.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { InterventoriaService } from '../../../core/services/interventoria.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Factura } from '../../../core/models/factura.model';
import { FacturaService } from '../../../core/services/factura.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FacturaInterventoriaService } from '../../../core/services/facturaInterventoria.service';
import { FacturaInterventoria } from '../../../core/models/facturaInterventoria.model';

@Component({
  selector: 'gp-interventoria',
  templateUrl: './interventoria.component.html',
  styleUrls: ['./interventoria.component.scss']
})
export class InterventoriaComponent implements OnInit {

  public optionsEditor: Object = {
    placeholderText: 'Inicia el Informe haciendo clik acá',
    charCounterCount: false,
    language: 'es',
    toolbarInline: false,
    toolbarButtons: [
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'undo',
      'redo',
      'paragraphFormat',
      'align',
      'formatOL',
      'formatUL',
      'indent',
      'outdent']
  };
  interventorProyecto = false;

  interventoriaForm: FormGroup;
  informe = new FormControl('', Validators.required);
  fechaCreacion = new FormControl('', Validators.required);
  interventor = new FormControl('', Validators.required);

  proyecto = new FormControl('');
  tipoinforme = new FormControl('', Validators.required);
  _proyecto: Proyecto = {};
  id = '';
  fechaHoy = new Date();

  facturasPorProyecto: Factura[] = [];
  facturaValor = 0;
  f: Factura[] = [];
  selection = new SelectionModel<Factura>(true, [], true);

  facturaInterventoria: FacturaInterventoria = {};

  constructor(
    private _route: ActivatedRoute,
    public proyectoService: ProyectoService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private interventoriaService: InterventoriaService,
    public auth: AuthService,
    public facturaService: FacturaService,
    public facturaInterventoriaService: FacturaInterventoriaService
  ) { }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this.getProyecto(this.id);
    this.interventoriaForm = this.formBuilder.group({
      informe: this.informe,
      proyecto: this.proyecto,
      interventor: this.auth.currentUser.username,
      fechaCreacion: this.fechaHoy,
      tipoinforme: this.tipoinforme,
      facturasAvaladas: this.selection.selected
    });
  }

  getProyecto(id) {
    this.proyectoService.getProyectoByIdentificacion(id).subscribe(
      data => {
        this._proyecto = data;
      },
      error => console.log(error),

      () => this.getFacturasPorProyecto(this._proyecto._id)
    );
  }
  getFacturasPorProyecto(_id) {
    this.facturaService.getFactura2(_id).subscribe(
      data => this.facturasPorProyecto = data,
      error => console.log(error),
      () => {
        this.facturaValor = 0;
        for (let index = 0; index < this.facturasPorProyecto.length; index++) {
          this.facturaValor = this.facturaValor + this.facturasPorProyecto[index].valor;
        }
      }
    );
  }
  agregarInterventoria() {
    this.interventoriaService.addInterventoria(this.interventoriaForm.value).subscribe(
      res => {
        for (let factura = 0; factura < this.selection.selected.length; factura++) {
          const element = this.selection.selected[factura];
          element.avalado = true;

          this.facturaService.editFactura(element).subscribe(
            resp => this.toast.setMessage('Factura Actualizada exitosamente!', 'success'),
            error => this.toast.setMessage('No se agregó la actualizacion factura ', 'danger')
          );
          this.facturaInterventoria = {};
          this.facturaInterventoria  = {
            interventoria: res,
            factura: element
          };
          this.facturaInterventoriaService.addFacturaInterventoria(this.facturaInterventoria).subscribe(
            resp => this.toast.setMessage('Interventoria guardada exitosamente!', 'success'),
            error => this.toast.setMessage('No se agregó la factura interventoria', 'danger')
          );
        }
        this.toast.setMessage('Interventoria fuardada exitosamente!', 'success');
        this.router.navigate(['/dashboard/interventoria/interventorias/' + this._proyecto.identificacion]);
      },
      error => this.toast.setMessage('No se agregó', 'danger')
    );
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.facturasPorProyecto.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.facturasPorProyecto.forEach(row => this.selection.select(row));
  }

  guardarSeleccionado() {

    console.log(this.selection);
  }
}
