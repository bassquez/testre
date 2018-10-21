import { Component, OnInit } from '@angular/core';

import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../core/auth/auth.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'gp-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  users: User[] = [];
  isLoading = true;

  isEditing = false;
  user = new User;

  editForm: FormGroup;
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  role = new FormControl('', [
    Validators.required
  ]);
  nombre = new FormControl('', [
    Validators.required
  ]);
  apellido = new FormControl('', [
    Validators.required
  ]);
  cargo = new FormControl('', [
    Validators.required
  ]);
  identificacion = new FormControl('', [
    Validators.required
  ]);
  hide = false;
  correoErrorMessage() {
    return this.email.hasError('required') ? 'Debe ingresar email' :
      this.email.hasError('email') ? 'No es un email valido' :
        '';
  }
  passErrorMessage() {
    return this.password.hasError('required') ? 'Debe ingresar Contraseña' :
      this.password.hasError('minlength') ? 'La contraseña debe tener almenos 6 caracteres' :
        this.password.hasError('maxlength') ? 'La contraseña debe tener menos de 15 caracteres' :
          '';
  }

  nombreErrorMessage() {
    return this.nombre.hasError('required') ? 'Debe ingresar Contraseña' :
      '';
  }
  apellidoErrorMessage() {
    return this.apellido.hasError('required') ? 'Debe ingresar Contraseña' :
      '';
  }
  identificacionErrorMessage() {
    return this.identificacion.hasError('required') ? 'Debe ingresar Contraseña' :
      '';
  }
  cargoErrorMessage() {
    return this.cargo.hasError('required') ? 'Debe ingresar Contraseña' :
      '';
  }

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    public toast: ToastComponent,
    private userService: UserService) {
  }

  ngOnInit() {
    this.getUsers();
    this.editForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      nombre: this.nombre,
      apellido: this.apellido,
      identificacion: this.identificacion,
      cargo: this.cargo
    });
  }

  edit(user: User): void {
    this.userService.editUser(user).subscribe(
      () => {
        this.isEditing = false;
        this.user = user;
        this.toast.setMessage('Usuario editado con exito.', 'success');
        this.getUsers();
      },
      error => console.log(error)
    );
  }
  cancelEditing() {
    this.isEditing = false;
    this.user = new User();
    this.toast.setMessage('Edición cancelada.', 'warning');
    this.getUsers();
  }

  enableEditing(user: User) {
    this.isEditing = true;
    this.user = user;
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  deleteUser(user: User) {
    if (window.confirm('Estás segur@ que quieres Eliminar ' + user.username + '?')) {
      this.userService.deleteUser(user).subscribe(
        data => this.toast.setMessage('user deleted successfully.', 'success'),
        error => console.log(error),
        () => this.getUsers()
      );
    }
  }
}
