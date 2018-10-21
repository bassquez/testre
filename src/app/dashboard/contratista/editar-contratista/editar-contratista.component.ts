import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { ContratistaService } from '../../../core/services/contratista.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Contratista } from '../../../core/models/contratista';

@Component({
  selector: 'gp-editar-contratista',
  templateUrl: './editar-contratista.component.html',
  styleUrls: ['./editar-contratista.component.scss']
})
export class EditarContratistaComponent implements OnInit {

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
  contratistaId = '';
  contratista = new Contratista;


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

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    public toast: ToastComponent,
    private contratistaService: ContratistaService,
    private formBuilder: FormBuilder,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.contratistaId = this._route.snapshot.paramMap.get('identificacion');
    this.getContratista();
    this.contratistaForm = this.formBuilder.group({
      identificacion: this.identificacion,
      nombre: this.nombre,
      tipoId: this.tipoId,
      usuario: this.auth.currentUser.username,
      fechaCreacion: this.fechaHoy
    });
  }

  getContratista() {
    this.contratistaService.getContratistaId(this.contratistaId).subscribe(
      data => this.contratista = data,
      error => console.log(error)
    );
    console.log(this.contratista);

  }

  edit(contratista: Contratista): void {
    this.contratistaService.editContratista(contratista).subscribe(
      () => {
        this.contratista = contratista;
        this.toast.setMessage('item editado con exito.', 'success');

      },
      error => console.log(error)
    );
  }
}
