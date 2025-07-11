import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../app/services/auth.service';
import { Producto, ProductoService } from '../../app/services/productos.service';
import { CarritoService } from '../../app/services/carrito.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: true
})
export class Home implements OnInit {
  productos$: Observable<Producto[]>;  // Observable reactivo

  videos = [
    'assets/videos/videostockFerreteria.mp4',
    'assets/videos/videostockGalletaFerremas.mp4',
    'assets/videos/videostockTaladro.mp4'
  ];
  currentVideo = 0;

  constructor(
    private authService: AuthService,
    private productoService: ProductoService,
    private carritoService: CarritoService
  ) {
    this.productos$ = this.productoService.getProductos();
  }

  ngOnInit(): void {}

  nextVideo() {
    this.currentVideo = (this.currentVideo + 1) % this.videos.length;
  }

  cerrarSesion(): void {
    this.authService.logout();
  }

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregarProducto(producto, 1).subscribe({
      next: () => {
        alert(`"${producto.nombre}" agregado al carrito`);
      },
      error: err => {
        console.error('Error al agregar al carrito:', err);
        alert('Error al agregar al carrito');
      }
    });
  }
}
