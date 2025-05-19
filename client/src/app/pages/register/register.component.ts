import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  messageRegister: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  showPasswordConfirm = false;

  togglePasswordConfirmVisibility() {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.messageRegister = 'Por favor, completa todos los campos';
      return;
    }
    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      this.messageRegister = 'Las contraseñas no coinciden';
      return;
    }

    const data = this.registerForm.value;
    console.log('Formulario enviado:', data);
    this.authService.register(data).subscribe({
      next: (res) => {
        this.messageRegister = 'Usuario registrado correctamente';
        console.log(res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.messageRegister =
          err.error?.message || 'Error al registrar usuario';
      },
    });
  }
}
