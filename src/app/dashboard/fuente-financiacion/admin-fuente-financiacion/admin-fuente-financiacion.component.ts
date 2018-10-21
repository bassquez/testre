import { Component, OnInit } from '@angular/core';
import { FuenteFinanciacion } from '../../../core/models/fuenteFinanciacion.model';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { FuenteFinanciacionService } from '../../../core/services/fuenteFinanciacion.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'gp-admin-fuente-financiacion',
  templateUrl: './admin-fuente-financiacion.component.html',
  styleUrls: ['./admin-fuente-financiacion.component.scss']
})
export class AdminFuenteFinanciacionComponent implements OnInit {

  fuentesFinanciacion: FuenteFinanciacion[] = [];
  isLoading = true;
  fuenteFinanciacion = new FuenteFinanciacion;
  isEditing = false;

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  rubroMask: any[] = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  fechaHoy = new Date();
  ffForm: FormGroup;
  rubro = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(15),
  ]);
  nombre = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(100)
  ]);
  monto = new FormControl('', [
    Validators.required,
    Validators.min(9999)
  ]);
  vencimiento = new FormControl('', [
    Validators.required
  ]);
  usuario = new FormControl();
  fechaCreacion = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    public toast: ToastComponent,
    private fuentesFinanciacionervice: FuenteFinanciacionService
  ) { }

  ngOnInit() {
    this.getfuentesFinanciacion();
    this.ffForm = this.formBuilder.group({
      rubro: this.rubro,
      nombre: this.nombre,
      monto: this.monto,
      vencimiento: this.vencimiento,
      usuario: this.auth.currentUser.username,
      fechaCreacion: this.fechaHoy
    });
  }

  edit(fuenteFinanciacion: FuenteFinanciacion): void {
    this.fuentesFinanciacionervice.editFuenteFinanciacion(fuenteFinanciacion).subscribe(
      () => {
        this.isEditing = false;
        this.fuenteFinanciacion = fuenteFinanciacion;
        this.toast.setMessage('item editado con exito.', 'success');
        this.getfuentesFinanciacion();
      },
      error => console.log(error)
    );
  }
  cancelEditing() {
    this.isEditing = false;
    this.fuenteFinanciacion = new FuenteFinanciacion();
    this.toast.setMessage('Edición cancelada.', 'warning');
    this.getfuentesFinanciacion();
  }

  enableEditing(fuenteFinanciacion: FuenteFinanciacion) {
    this.isEditing = true;
    this.fuenteFinanciacion = fuenteFinanciacion;
  }
  getfuentesFinanciacion() {
    this.fuentesFinanciacionervice.getFuenteFinanciacions().subscribe(
      data => this.fuentesFinanciacion = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  deleteFuenteF(fuenteFinanciacion: FuenteFinanciacion) {
    if (window.confirm('Estás segur@ que quieres Eliminar ' + fuenteFinanciacion.nombre + '?')) {
      this.fuentesFinanciacionervice.deleteFuenteFinanciacion(fuenteFinanciacion).subscribe(
        data => this.toast.setMessage('fuenteFinanciacion deleted successfully.', 'success'),
        error => console.log(error),
        () => this.getfuentesFinanciacion()
      );
    }
  }

}
