import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../../../core/services/proyecto.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { InterventoriaService } from '../../../core/services/interventoria.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Interventoria } from '../../../core/models/interventoria.model';
import { Proyecto } from '../../../core/models/proyecto.model';
import { MatDialog } from '@angular/material';
import { ModalInterventoriaComponent } from '../modal-interventoria/modal-interventoria.component';
import { FacturaInterventoriaService } from '../../../core/services/facturaInterventoria.service';
import { Factura } from '../../../core/models/factura.model';
import { FacturaInterventoria } from '../../../core/models/facturaInterventoria.model';
import { SelectionModel } from '@angular/cdk/collections';
import { FacturaService } from '../../../core/services/factura.service';
export interface DialogData {
  interventoria: Interventoria;
}
@Component({
  selector: 'gp-interventorias',
  templateUrl: './interventorias.component.html',
  styleUrls: ['./interventorias.component.scss']
})
export class InterventoriasComponent implements OnInit {

  id = '';
  interventorias: Interventoria[] = [];
  _proyecto: Proyecto = {
    identificacion: '',
    interventor: {
      nombre: '',
      apellido: ''
    }
  };
  interventorProyecto = false;

  facturas: Factura[] = [];
  facturaValor = 0;
  isEditing = false;

  _interventoria = new Interventoria;


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

  interventoriaForm: FormGroup;
  informe = new FormControl('', Validators.required);
  fechaCreacion = new FormControl('', Validators.required);
  interventor = new FormControl('', Validators.required);

  proyecto = new FormControl('');
  tipoinforme = new FormControl('', Validators.required);
  fechaHoy = new Date();

  facturasPorInterventoria: FacturaInterventoria[] = [];
  facturasPorProyecto: Factura[] = [];
  selection = new SelectionModel<Factura>(true, [], true);

  facturaInterventoria: FacturaInterventoria = {};
  constructor(
    private _route: ActivatedRoute,
    public proyectoService: ProyectoService,
    public toast: ToastComponent,
    private interventoriaService: InterventoriaService,
    public auth: AuthService,
    public dialog: MatDialog,
    public router: Router,
    public facturaInterventoriaService: FacturaInterventoriaService,
    public facturaService: FacturaService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this.getProyecto();

    this.interventoriaForm = this.formBuilder.group({
      informe: this.informe,
      proyecto: this.proyecto,
      interventor: this.auth.currentUser.username,
      fechaCreacion: this.fechaHoy,
      tipoinforme: this.tipoinforme,
    });
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
  edit(interventoria: Interventoria): void {
    this.interventoriaService.editInterventoria(interventoria).subscribe(
      () => {
        for (let factura = 0; factura < this.selection.selected.length; factura++) {
          const element = this.selection.selected[factura];
          element.avalado = true;

          this.facturaService.editFactura(element).subscribe(
            resp => this.toast.setMessage('Factura Actualizada exitosamente!', 'success'),
            error => this.toast.setMessage('No se agregó la actualizacion factura ', 'danger')
          );
          this.facturaInterventoria = {};
          this.facturaInterventoria = {
            interventoria: this._interventoria,
            factura: element
          };
          this.facturaInterventoriaService.addFacturaInterventoria(this.facturaInterventoria).subscribe(
            resp => this.toast.setMessage('Interventoria guardada exitosamente!', 'success'),
            error => this.toast.setMessage('No se agregó la factura interventoria', 'danger')
          );
        }
        this.isEditing = false;
        this._interventoria = interventoria;
        this.toast.setMessage('item editado con exito.', 'success');
        this.getInterventorias();
        this.getFacturaInterventoria();
        this.getFacturasPorProyecto(this._proyecto._id);
      },
      error => console.log(error)
    );
  }
  cancelEditing() {
    this.isEditing = false;
    this._interventoria = new Interventoria();
    this.toast.setMessage('Edición cancelada.', 'warning');
    this.getInterventorias();
  }

  enableEditing(interventoria: Interventoria) {
    this.isEditing = true;
    this._interventoria = interventoria;
    this.getFacturaInterventoria();
  }

  getFacturaInterventoria() {
    this.facturaInterventoriaService.getFacturaInterventoria(this._interventoria._id).subscribe(
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

  deleteFacturaInterventoria(factura: FacturaInterventoria) {
    this.facturaInterventoriaService.deleteFacturaInterventoria(factura).subscribe(
      data => {
        this.updateFactura(factura.factura);
        this.toast.setMessage('proyecto deleted successfully.', 'success');
        this.getFacturaInterventoria();
        this.getFacturasPorProyecto(this._proyecto._id);
      },
      error => console.log(error)
    );
  }
  updateFactura(factura: Factura) {
    factura.avalado = false;
    this.facturaService.editFactura(factura).subscribe(
      () => {
        this.toast.setMessage('item editado con exito.', 'success');
        this.getFacturaInterventoria();
      },
      error => console.log(error)
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


  getProyecto() {
    this.proyectoService.getProyectoByIdentificacion(this.id).subscribe(
      data => {
        this._proyecto = data,
          this.getInterventorias();
        this.getFacturasPorProyecto(this._proyecto._id);
      },
      error => console.log(error)
    );
  }
  getInterventorias() {
    this.interventoriaService.getInterventoria(this._proyecto._id).subscribe(
      data => this.interventorias = data,
      error => console.log(error)
    );
  }
  openDialogDetalle(interventoria) {
    this.dialog.open(ModalInterventoriaComponent, {
      width: '100vw',
      data: {
        interventoria: interventoria
      }
    });
  }

  interventoria(proyecto) {
    this.router.navigate(['/dashboard/interventoria/interventoria/' + proyecto.identificacion]);

  }

  borrarInterventoria(interventoria: Interventoria) {
    if (window.confirm('Estás segur@ que quieres Eliminar la interventoria con fecha ' + interventoria.fechaCreacion + '?')) {
      this.interventoriaService.deleteInterventoria(interventoria).subscribe(
        data => this.toast.setMessage('proyecto deleted successfully.', 'success'),
        error => console.log(error),
        () => this.getInterventorias()
      );
    }
  }


}
