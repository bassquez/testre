import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastComponent } from '../../../shared/toast/toast.component';

import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProyectoService } from '../../../core/services/proyecto.service';
import { FuenteFinanciacionService } from '../../../core/services/fuenteFinanciacion.service';
import { ContratistaService } from '../../../core/services/contratista.service';
import { AuthService } from '../../../core/auth/auth.service';
import { ModalFuenteProyectoComponent } from '../modal-fuente-proyecto/modal-fuente-proyecto.component';
import { FuenteFinanciacion } from '../../../core/models/fuenteFinanciacion.model';
import { FuenteFinanciacionProyecto } from '../../../core/models/fuenteFinanciacionProyecto.model';
import { Contratista } from '../../../core/models/contratista';
import { FuenteFinanciacionProyectoService } from '../../../core/services/fuenteFinanciacionProyecto.service';
import { Proyecto } from '../../../core/models/proyecto.model';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { ProyectoFuenteComponent } from '../proyecto-fuente/proyecto-fuente.component';

export interface FuenteProyecto {
  fuenteProyecto: FuenteFinanciacionProyecto;
  inversion: number;
}

@Component({
  selector: 'gp-add-proyecto',
  templateUrl: './add-proyecto.component.html',
  styleUrls: ['./add-proyecto.component.scss']
})
export class AddProyectoComponent implements OnInit {

  @ViewChild(ProyectoFuenteComponent) proyectoFuente: ProyectoFuenteComponent;

  contratistas: Contratista[] = [];
  users: User[] = [];

  fechaHoy = new Date();
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  proyectoForm: FormGroup;
  usuario = new FormControl();
  fechaCreacion = new FormControl();
  contratista = new FormControl('', [
    Validators.required
  ]);

  objeto = new FormControl('', [
    Validators.required
  ]);

  identificacion = new FormControl('', [
    Validators.required
  ]);
  interventor = new FormControl('', [
    Validators.required
  ]);
  inversion = new FormControl('', [
    Validators.required
  ]);
  plazo = new FormControl('', [
    Validators.required
  ]);
  tipoPlazo = new FormControl('', [
    Validators.required
  ]);

  fechaInicio = new FormControl('', [
    Validators.required
  ]);

  fechaFin = new FormControl('');

  valor = new FormControl('', [
    Validators.required
  ]);

  suma = 0;


  objetoErrorMessage() {
    return this.objeto.hasError('required') ? 'Debe ingresar objeto' :
      '';
  }
  identificacionErrorMessage() {
    return this.identificacion.hasError('required') ? 'Debe ingresar identificacion' :
      '';
  }
  plazoErrorMessage() {
    return this.plazo.hasError('required') ? 'Debe ingresar plazo' :
      '';
  }
  fechaInicioErrorMessage() {
    return this.fechaInicio.hasError('required') ? 'Debe ingresar Fecha de inicio' :
      '';
  }
  inversionErrorMessage() {
    return this.valor.hasError('required') ? 'Debe ingresar Valor' :
      '';
  }


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private proyectoService: ProyectoService,
    private contratistaService: ContratistaService,
    public auth: AuthService,
    public dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getContratistas();
    this.getUsers();
    this.proyectoForm = this.formBuilder.group({
      objeto: this.objeto,
      contratista: this.contratista,
      identificacion: this.identificacion,
      plazo: this.plazo,
      tipoPlazo: this.tipoPlazo,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      usuario: this.auth.currentUser.username,
      fechaCreacion: this.fechaHoy,
      inversion: this.inversion,
      interventor: this.interventor
    });
  }

  getContratistas() {
    this.contratistaService.getContratistas().subscribe(
      data => this.contratistas = data,
      error => console.log(error)
    );
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error)
    );
  }

  register() {
    this.proyectoService.addProyecto(this.proyectoForm.value).subscribe(
      res => {
        this.toast.setMessage('Se guardo exitosamente el proyecto!', 'success');
        this.router.navigate(['/dashboard/proyecto/add-fuentes/' + this.identificacion.value ]);
      },
      error => this.toast.setMessage('El proyecto no se guardo', 'danger')
    );
  }



}
