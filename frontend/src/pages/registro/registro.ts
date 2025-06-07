import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../app/services/register.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.scss']  // corregido de styleUrl a styleUrls
})
export class Registro {
  registroForm: FormGroup;
  registro = inject(RegisterService);
  successMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      genero: ['', Validators.required],
      celular: ['', Validators.required],
      rut: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

async onSubmit() {
  if (this.registroForm.invalid) return;

  try {
    const response = await this.registro.register(this.registroForm.value);
    console.log(response);

    // Mostrar alerta con mensaje de éxito
    alert('Registro exitoso');

    // Redirigir al login al aceptar el alert
    this.router.navigate(['login']);
  } catch (error) {
    console.error('Error al registrarse:', error);
    alert('Error al registrarse. Por favor intenta nuevamente.');
  }
}
}
