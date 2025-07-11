import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Producto, ProductoService } from '../../app/services/productos.service';
import { AuthService } from '../../app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.html',
  styleUrls: ['./crud.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule
  ],
})
export class Crud implements OnInit {
  productos: Producto[] = [];
  nuevoProducto = { marca: '', nombre: '', precio_inicial: 0 };

  constructor(
    private productoService: ProductoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: data => this.productos = data,
      error: err => {
        console.error('Error al cargar productos', err);
        this.snackBar.open('Error al cargar productos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  agregarProducto() {
    this.productoService.crearProducto(this.nuevoProducto).subscribe({
      next: () => {
        this.cargarProductos();
        this.snackBar.open('Producto agregado exitosamente', 'Cerrar', { duration: 3000 });
        this.nuevoProducto = { marca: '', nombre: '', precio_inicial: 0 };
      },
      error: err => {
        console.error('Error al crear producto', err);
        this.snackBar.open('Error al crear producto', 'Cerrar', { duration: 3000 });
      }
    });
  }

  eliminarProducto(id: number) {
    this.productoService.eliminarProducto(id).subscribe({
      next: () => {
        this.cargarProductos();
        this.snackBar.open('Producto eliminado', 'Cerrar', { duration: 3000 });
      },
      error: err => {
        console.error('Error al eliminar producto', err);
        this.snackBar.open('Error al eliminar producto', 'Cerrar', { duration: 3000 });
      }
    });
  }

  actualizarPrecio(id: number, nuevoValor: number) {
    this.productoService.actualizarPrecioProducto(id, nuevoValor).subscribe({
      next: () => {
        this.cargarProductos();
        this.snackBar.open('Precio actualizado', 'Cerrar', { duration: 3000 });
      },
      error: err => {
        console.error('Error al actualizar precio', err);
        this.snackBar.open('Error al actualizar precio', 'Cerrar', { duration: 3000 });
      }
    });
  }

  volverHome() {
  // Aquí pones la lógica para volver a la página principal, por ejemplo:
  this.router.navigate(['/']); // si usas Router de Angular
}

cerrarSesion() {
  // Aquí pones la lógica para cerrar sesión, por ejemplo:
  this.authService.logout(); // o lo que uses para logout
  this.router.navigate(['/login']); // redirigir al login después de cerrar sesión
}
}
