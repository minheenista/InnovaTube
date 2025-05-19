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
import { identity } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  messageLogin: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/home']);
    }
  }

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('Completa todos los campos');
      return;
    }

    const data = this.loginForm.value;
    console.log('Formulario enviado:', data);
    this.authService.login(data).subscribe({
      next: (res) => {
        this.messageLogin = 'Usuario autenticado correctamente';
        console.log(res);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        this.messageLogin =
          err.error?.message || 'Error al iniciar sesión, intenta de nuevo';
      },
    });
  }
}
