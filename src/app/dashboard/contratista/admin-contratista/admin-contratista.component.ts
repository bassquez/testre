import { Component, OnInit } from '@angular/core';
import { Contratista } from '../../../core/models/contratista';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { ContratistaService } from '../../../core/services/contratista.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'gp-admin-contratista',
  templateUrl: './admin-contratista.component.html',
  styleUrls: ['./admin-contratista.component.scss']
})
export class AdminContratistaComponent implements OnInit {


  contratistas: Contratista[] = [];
  isLoading = true;
  isEditing = false;
  contratista = new Contratista;

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

  constructor(
    public auth: AuthService,
    public toast: ToastComponent,
    private contratistaService: ContratistaService,
    private router: Router,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {
    this.getContratistas();

    this.contratistaForm = this.formBuilder.group({
      identificacion: this.identificacion,
      nombre: this.nombre,
      tipoId: this.tipoId,
      usuario: this.auth.currentUser.username,
      fechaCreacion: this.fechaHoy
    });
  }

  edit(contratista: Contratista): void {
    this.contratistaService.editContratista(contratista).subscribe(
      () => {
        this.isEditing = false;
        this.contratista = contratista;
        this.toast.setMessage('item editado con exito.', 'success');
        this.getContratistas();
      },
      error => console.log(error)
    );
  }
  cancelEditing() {
    this.isEditing = false;
    this.contratista = new Contratista();
    this.toast.setMessage('Edición cancelada.', 'warning');
    // reload the cats to reset the editing
    this.getContratistas();
  }

  enableEditing(contratista: Contratista) {
    this.isEditing = true;
    this.contratista = contratista;
  }

  getContratistas() {
    this.contratistaService.getContratistas().subscribe(
      data => this.contratistas = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  deleteContratista(contratista: Contratista) {
    if (window.confirm('Estás segur@ que quieres Eliminar ' + contratista.nombre + '?')) {
      this.contratistaService.deleteContratista(contratista).subscribe(
        data => this.toast.setMessage('contratista deleted successfully.', 'success'),
        error => console.log(error),
        () => this.getContratistas()
      );
    }
  }
  contratistaEdit(contratista: Contratista) {
    this.router.navigate(['/dashboard/contratista/editar-contratista/' + contratista.identificacion]);
  }
}
