import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastComponent } from '../../../shared/toast/toast.component';

import { ContratistaService } from '../../../core/services/contratista.service';
import { AuthService } from '../../../core/auth/auth.service';
@Component({
  selector: 'gp-add-contratista',
  templateUrl: './add-contratista.component.html',
  styleUrls: ['./add-contratista.component.scss']
})
export class AddContratistaComponent implements OnInit {


  fechaHoy = new Date();
  contratistaForm: FormGroup;
  identificacion = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(15),
  ]);
  nombre = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(100)
  ]);
  tipoId = new FormControl('', [
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
  identificacionErrorMessage() {
    return this.identificacion.hasError('required') ? 'Debe ingresar Rubro' :
      this.identificacion.hasError('minlength') ? 'La identificacion debe tener almenos 8 caracteres' :
        this.identificacion.hasError('maxlength') ? 'La identificacion debe tener menos de 15 caracteres' :
          '';
  }
  tipoIdErrorMessage() {
    return this.tipoId.hasError('required') ? 'Debe ingresar monto' :
      '';
  }

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private contratistaService: ContratistaService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.contratistaForm = this.formBuilder.group({
      identificacion: this.identificacion,
      nombre: this.nombre,
      tipoId: this.tipoId,
      usuario: this.auth.currentUser.username,
      fechaCreacion: this.fechaHoy
    });
  }

  add() {
    this.contratistaService.addContratista(this.contratistaForm.value).subscribe(
      res => {
        this.toast.setMessage('Fuente de financiación agregada exitosamente!', 'success');
        this.router.navigate(['/dashboard']);
      },
      error => this.toast.setMessage('No se agregó', 'danger')
    );
  }

}
