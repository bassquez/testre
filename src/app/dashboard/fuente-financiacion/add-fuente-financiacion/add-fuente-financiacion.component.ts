import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { FuenteFinanciacionService } from '../../../core/services/fuenteFinanciacion.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'gp-add-fuente-financiacion',
  templateUrl: './add-fuente-financiacion.component.html',
  styleUrls: ['./add-fuente-financiacion.component.scss']
})
export class AddFuenteFinanciacionComponent implements OnInit {
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
  nameErrorMessage() {
    return this.nombre.hasError('required') ? 'Debe ingresar nombre' :
      this.nombre.hasError('nombre') ? 'No es un nombre valido' :
        this.nombre.hasError('minlength') ? 'El nombre debe tener almenos 4 caracteres' :
          this.nombre.hasError('maxlength') ? 'El nombre debe tener menos de 10 caracteres' :
            '';
  }
  rubroErrorMessage() {
    return this.rubro.hasError('required') ? 'Debe ingresar Rubro' :
      this.rubro.hasError('rubro') ? 'Debe ingresar Rubro Valido' :
        this.rubro.hasError('minlength') ? 'El Rubro debe tener almenos 13 caracteres' :
          this.rubro.hasError('maxlength') ? 'El Rubro  debe tener menos de 15 caracteres' :
            '';
  }
  montoErrorMessage() {
    return this.monto.hasError('required') ? 'Debe ingresar monto' :
      this.monto.hasError('monto') ? 'Debe ingresar monto valido' :
        this.monto.hasError('min') ? 'El monto debe ser de almenos 10.000' :
          '';
  }
  vencimientoErrorMessage() {
    return this.vencimiento.hasError('required') ? 'Debe ingresar vencimiento' :
      '';
  }
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private ffService: FuenteFinanciacionService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.ffForm = this.formBuilder.group({
      rubro: this.rubro,
      nombre: this.nombre,
      monto: this.monto,
      vencimiento: this.vencimiento,
      usuario: this.auth.currentUser.username,
      fechaCreacion: this.fechaHoy
    });
  }

  add() {
    this.ffService.addFuenteFinanciacion(this.ffForm.value).subscribe(
      res => {
        this.toast.setMessage('Fuente de financiación agregada exitosamente!', 'success');
        this.router.navigate(['/dashboard']);
      },
      error => this.toast.setMessage('No se agregó', 'danger')
    );
  }
}
