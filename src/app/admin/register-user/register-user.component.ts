import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../../shared/toast/toast.component';
import { UserService } from '../../core/services/user.service';
import { EqualValidator } from './password-validation';

function passwordMatchValidator(g: FormGroup) {
  return g.get('password').value === g.get('passwordConfirm').value
    ? null : { 'mismatch': true };
}
@Component({
  selector: 'gp-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  registerForm: FormGroup;
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

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
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

  setClassUsername() {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }

  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }

  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  register() {
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.router.navigate(['/admin/admin-user']);
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
  }
}
