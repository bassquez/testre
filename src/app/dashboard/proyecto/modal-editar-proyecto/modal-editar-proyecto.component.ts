import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Proyecto } from '../../../core/models/proyecto.model';
import { FuenteFinanciacionProyecto } from '../../../core/models/fuenteFinanciacionProyecto.model';
import { FuenteFinanciacionProyectoService } from '../../../core/services/fuenteFinanciacionProyecto.service';
import { ProyectoService } from '../../../core/services/proyecto.service';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { ContratistaService } from '../../../core/services/contratista.service';
import { AuthService } from '../../../core/auth/auth.service';
import { UserService } from '../../../core/services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../../core/models/user.model';
import { Contratista } from '../../../core/models/contratista';
import { DialogData } from '../modal-detalle-proyecto/modal-detalle-proyecto.component';
@Component({
  selector: 'gp-modal-editar-proyecto',
  templateUrl: './modal-editar-proyecto.component.html',
  styleUrls: ['./modal-editar-proyecto.component.scss']
})
export class ModalEditarProyectoComponent implements OnInit {
  contratistas: Contratista[] = [];
  users: User[] = [];

  proyecto = new Proyecto();

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
  constructor(
    public dialogRef: MatDialogRef<ModalEditarProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    public toast: ToastComponent,
    private proyectoService: ProyectoService,
    private contratistaService: ContratistaService,
    public auth: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getContratistas();
    this.getUsers();
    this.getProyecto();
    console.log('proyecto onInitit' + this.proyecto);
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
  getProyecto() {
    this.proyectoService.getProyecto(this.data.proyecto._id).subscribe(
      data => this.proyecto = data,
      error => console.log(error)
    );
  }
  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error)
    );
  }
  edit(proyecto: Proyecto): void  {
    console.log('Proyecto boton Editar ' + this.proyecto);
    this.proyectoService.editProyecto(proyecto).subscribe(
      () => {
        this.proyecto = proyecto;
        this.toast.setMessage('item editado con exito.', 'success');

      },
      error => console.log(error)
    );
    this.dialogRef.close();
  }

  compareFn(proyecto1: Proyecto, proyecto2: Proyecto) {
    return proyecto1 && proyecto2 ? proyecto1.identificacion === proyecto2.identificacion : proyecto1 === proyecto2;
}

}
