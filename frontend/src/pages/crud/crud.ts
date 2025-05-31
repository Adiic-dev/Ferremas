import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Producto {
  id?: number;
  nombre: string;
  precio: number;
  stock: number;
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.html',
  styleUrl: './crud.scss',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class Crud {
  productos: Producto[] = [];
  producto: Producto = this.nuevoProducto();

  // Simulación de ID autoincremental
  private nextId = 1;

  onSubmit() {
    if (this.producto.id) {
      // Actualizar producto
      const idx = this.productos.findIndex(p => p.id === this.producto.id);
      if (idx > -1) this.productos[idx] = { ...this.producto };
    } else {
      // Crear producto
      this.producto.id = this.nextId++;
      this.productos.push({ ...this.producto });
    }
    this.resetForm();
  }

  editarProducto(prod: Producto) {
    this.producto = { ...prod };
  }

  eliminarProducto(id?: number) {
    this.productos = this.productos.filter(p => p.id !== id);
    this.resetForm();
  }

  resetForm() {
    this.producto = this.nuevoProducto();
  }

  private nuevoProducto(): Producto {
    return { nombre: '', precio: 0, stock: 0 };
  }
}